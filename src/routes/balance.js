import { db } from "../db/index.js";
import { payersTable } from "../db/schema.js";

export const balanceRoute = async (req, res) => {
  try {
    const payers = await db.select().from(payersTable);

    // Convert payers list to an object with names as keys and total points as values
    const response = payers.reduce((acc, payer) => {
      acc[payer.name] = (acc[payer.name] ?? 0) + payer.points;
      return acc;
    }, {});

    res.status(200).json(response);
  } catch (error) {
    console.error("Error retrieving payer balances:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
