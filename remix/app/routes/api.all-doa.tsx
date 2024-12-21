import { json } from "@remix-run/node";
import fs from "fs/promises";
import path from "path";

export async function loader() {
  try {
    // Load and parse the JSON file
    const filePath = path.join(process.cwd(), "app", "data", "doa.json");
    const fileContents = await fs.readFile(filePath, "utf-8");
    const doaList = JSON.parse(fileContents);

    // Ensure the list is not empty
    if (!doaList || doaList.length === 0) {
      throw new Error("No doa available in the file.");
    }

    // Return the full list of doa as JSON
    return json(doaList);
  } catch (error) {
    console.error("Error loading doa list:", error);
    return json({ error: "Unable to fetch doa list." }, { status: 500 });
  }
}
