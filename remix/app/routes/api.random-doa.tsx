import doaList from "~/data/doa.json";

export async function loader() {
  try {
    // Ensure the list is not empty
    if (!doaList || doaList.length === 0) {
      throw new Error("No doa available in the file.");
    }

    // Pick a random doa
    const randomDoa = doaList[Math.floor(Math.random() * doaList.length)];

    // Return the random doa as JSON
    return Response.json(randomDoa);
  } catch (error) {
    console.error("Error loading random doa:", error);
    return Response.json({ error: "Unable to fetch random doa." }, { status: 500 });
  }
}
