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
  updates,
}: {
  id: number;
  userId: number;
  updates: {
    title?: string;
    description?: string | null;
    status?: Status;
    priority?: Priority;
  };
}) => {
  const setClauses: string[] = [];
  const values = [];
  let paramIndex = 1;

  // Track always-updating metadata field
  setClauses.push(`updated_at = CURRENT_TIMESTAMP`);

  // Dynamically iterate through keys to build safe relational parameters
  for (const [key, value] of Object.entries(updates)) {
    // Ensure we only touch fields that belong in the database columns
    if (["title", "description", "status", "priority"].includes(key)) {
      setClauses.push(`${key} = $${paramIndex}`);
      values.push(value);
      paramIndex++;
    }
  }

  // If no updates were actually provided, skip database operation and fetch the current record
  if (values.length === 0) {
    const fallbackQuery = `SELECT * FROM tasks WHERE id = $1 AND user_id = $2;`;
    const fallbackResult = await pool.query(fallbackQuery, [id, userId]);
    return fallbackResult.rows[0];
  }

  // Inject ID and UserID at the tail end of the parameters array
  values.push(id, userId);
  const idParam = `$${paramIndex}`;
  const userIdParam = `$${paramIndex + 1}`;

  const query = `
    UPDATE tasks
    SET ${setClauses.join(", ")}
    WHERE id = ${idParam} AND user_id = ${userIdParam}
    RETURNING *;
  `;

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteTaskService = async (id: number, userId: number) => {
  const query = "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *;";
  const result = await pool.query(query, [id, userId]);
  return (result.rowCount ?? 0) > 0;
};
