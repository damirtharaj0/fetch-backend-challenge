import { db } from "../db/index.js";
import { payersTable } from "../db/schema.js";

export const addRoute = async (req, res) => {
  try {
    const { payer, points, timestamp } = req.body;

    // Validate input
    if (!payer || !points || !timestamp) {
      return res
        .status(400)
        .json({ error: "payer, points, and timestamp are required" });
    }

    if (typeof payer !== "string") {
      return res.status(400).json({ error: "payer must be a valid string" });
    }

    if (typeof points !== "number" || !Number.isFinite(points)) {
      return res.status(400).json({ error: "points must be a valid number" });
    }

    const parsedTimestamp = new Date(timestamp);
    if (isNaN(parsedTimestamp.getTime())) {
      return res.status(400).json({ error: "Invalid timestamp format" });
    }

    // Insert the new payer record
    await db
      .insert(payersTable)
      .values({
        name: payer,
        points,
        timestamp: parsedTimestamp,
      })
      .returning();

    res.status(200).json();
  } catch (error) {
    console.error("Error adding payer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
