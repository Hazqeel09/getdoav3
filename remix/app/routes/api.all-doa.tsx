import doaList from "~/data/doa.json";

export async function loader() {
  try {
    // Ensure the list is not empty
    if (!doaList || doaList.length === 0) {
      throw new Error("No doa available in the file.");
    }

    // Return the full list of doa as JSON
    return Response.json(doaList);
  } catch (error) {
    console.error("Error loading doa list:", error);
    return Response.json({ error: "Unable to fetch doa list." }, { status: 500 });
  }
}
