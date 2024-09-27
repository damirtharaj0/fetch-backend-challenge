import { sqlite } from "../db/index.js";

// Funciton to create the payers table
export const createPayersTable = () => {
  sqlite.exec(`
        CREATE TABLE IF NOT EXISTS payers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          points INTEGER NOT NULL,
          timestamp DATETIME NOT NULL
        )
      `);
};
