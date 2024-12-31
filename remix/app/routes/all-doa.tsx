import { Link } from "@remix-run/react";
import { DataTable } from "../components/data-table";
import doaList from "~/data/doa.json";

export default function DoaTable() {
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
      <DataTable data={doaList} />
    </div>
  );
}
