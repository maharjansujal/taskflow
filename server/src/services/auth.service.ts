import { pool } from "../db";

export const findUserByEmail = async (email: string) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

export const createUser = async ({
  name,
  email,
  passwordHash,
}: {
  name: string;
  email: string;
  passwordHash: string;
}) => {
  const query = `INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) 
    RETURNING id, name, email, created_at`;
  const result = await pool.query(query, [name, email, passwordHash]);
  return result.rows[0];
};
