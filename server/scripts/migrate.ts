// scripts/migrate.ts
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const isLocal =
  process.env.DATABASE_URL?.includes("localhost") ||
  process.env.DATABASE_URL?.includes("127.0.0.1");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isLocal ? false : { rejectUnauthorized: false },
});
async function runMigrations() {
  try {
    const sqlPath = path.join(__dirname, "../src/db/schema.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");

    console.log("Connecting to Neon and applying schema changes...");
    await pool.query(sql);
    console.log("Database tables initialized successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await pool.end();
  }
}

runMigrations();
