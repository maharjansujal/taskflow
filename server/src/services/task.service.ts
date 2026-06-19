import { pool } from "../db";

export type Priority = "low" | "medium" | "high";
export type Status = "pending" | "in_progress" | "completed";

export const createTaskService = async ({
  userId,
  title,
  description,
  status,
  priority,
}: {
  userId: number;
  title: string;
  description: string;
  status?: Status;
  priority?: Priority;
}) => {
  const query = `
            INSERT INTO tasks (user_id, title, description, status, priority)
            VALUES ($1, $2, $3, COALESCE($4, 'pending'), COALESCE($5, 'medium'))
            RETURNING *;
        `;
  const values = [userId, title, description, status, priority];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAllTasksService = async (userId: number) => {
  const query =
    "SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC";
  const result = await pool.query(query, [userId]);
  return result.rows;
};

export const updateTaskService = async ({
  id,
  userId,
  title,
  description,
  status,
  priority,
}: {
  id: number;
  userId: number;
  title?: string;
  description?: string;
  status?: Status;
  priority?: Priority;
}) => {
  const query = `
            UPDATE tasks
SET
    title = COALESCE($1, title),
    description = COALESCE($2, description),
    status = COALESCE($3, status),
    priority = COALESCE($4, priority),
    updated_at = CURRENT_TIMESTAMP
WHERE id = $5
  AND user_id = $6
RETURNING *;
        `;
  const values = [title, description, status, priority, id, userId];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteTaskService = async (id: number, userId: number) => {
  const query = "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *;";
  const result = await pool.query(query, [id, userId]);
  return (result.rowCount ?? 0) > 0;
};
