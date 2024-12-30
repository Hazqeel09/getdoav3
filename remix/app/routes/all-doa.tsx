import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Doa, DataTable } from "../components/data-table";
import fs from "fs/promises";
import path from "path";

export async function loader() {
  try {
    const filePath = path.join(process.cwd(), "app", "data", "doa.json");
    const fileContents = await fs.readFile(filePath, "utf-8");
    const doaList = JSON.parse(fileContents);
    return json(doaList);
  } catch {
    return json([]);
  }
}

export default function DoaTable() {
  const data = useLoaderData<Doa[]>();
  return (
    <div className="bg-blue-50 min-h-screen p-4">
      <header className="flex justify-center pb-4">
        <Link to="/" prefetch="intent">
          <img
            src="/logo.svg"
            alt="GetDoa - Islamic Prayers and Supplications"
            className="h-auto w-full"
          />
        </Link>
      </header>
      <h1 className="text-2xl font-bold mb-4 text-center">Doa List</h1>
      <div className="flex justify-center mb-6">
        <Link
          to="/"
          className="flex items-start bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base"
        >
          Back to GetDoa
        </Link>
      </div>
      <DataTable data={data} />
    </div>
  );
}
