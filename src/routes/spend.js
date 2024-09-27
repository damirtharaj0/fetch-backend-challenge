import { db } from "../db/index.js";
import { payersTable } from "../db/schema.js";
import { eq, sum } from "drizzle-orm";

export const spendRoute = async (req, res) => {
  try {
    let { points } = req.body;

    // Validate input
    if (
      typeof points !== "number" ||
      !Number.isFinite(points) ||
      !Number.isInteger(points)
    ) {
      return res
        .status(400)
        .json({ error: "points must be a valid whole number" });
    }

    if (!points || points <= 0) {
      return res
        .status(400)
        .json({ error: "A valid points value is required" });
    }

    // Calculate the total available points
    const totalPoints = Number(
      (
        await db
          .select({
            totalPoints: sum(payersTable.points),
          })
          .from(payersTable)
      )[0]?.totalPoints || 0
    );

    // Check if the requested points exceed the total available points
    if (points > totalPoints) {
      return res.status(400).send("Insufficient points available");
    }

    const deductions = [];

    // Spend points using the oldest transactions first
    while (points > 0) {
      const oldestPayer = (
        await db
          .select()
          .from(payersTable)
          .orderBy(payersTable.timestamp)
          .limit(1)
      )[0];

      if (!oldestPayer) break;

      // Update the new deducted points for the payer
      const pointsToDeduct = Math.min(oldestPayer.points, points);
      await db
        .update(payersTable)
        .set({ points: oldestPayer.points - pointsToDeduct })
        .where(eq(payersTable.id, oldestPayer.id));

      deductions.push({ payer: oldestPayer.name, points: -pointsToDeduct });

      points -= pointsToDeduct;

      // Remove entry if all points from this payer are spent
      if (oldestPayer.points === pointsToDeduct) {
        await db.delete(payersTable).where(eq(payersTable.id, oldestPayer.id));
      }
    }

    // Return the list of payer point deductions
    return res.status(200).json(deductions);
  } catch (error) {
    console.error("Error processing spend points:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
