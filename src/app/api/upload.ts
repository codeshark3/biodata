import { NextApiRequest, NextApiResponse } from "next";
import { drizzleClient } from "~/server/db"; // Import your Drizzle ORM client setup

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { data } = req.body;

      // Save data to your database using Drizzle ORM
      // Assuming you have a function saveData that saves the data
      // await drizzleClient.saveData(data);

      res.status(200).json({ success: "Data saved successfully" });
    } catch (error) {
      console.error("Error saving data:", error);
      res
        .status(500)
        .json({ error: "An error occurred while saving the data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
