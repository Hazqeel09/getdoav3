import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@remix-run/react";

type Language = "en" | "my";

export type Doa = {
  name_my: string;
  name_en: string;
  content: string;
  reference_my: string;
  reference_en: string;
  meaning_my: string;
  meaning_en: string;
  category_names: string[];
  description_my: string;
  description_en: string;
  context_my: string;
  context_en: string;
  /** Slug can be anything, but should be unique for each doa, and url-safe */
  slug: string;
};

// Mobile card component for each row
const MobileDoaCard = ({
  data,
  language,
}: {
  data: Doa;
  language: Language;
}) => (
  <Card className="mb-4 overflow-hidden">
    <div className="p-4 space-y-4">
      <div>
        <h3 className="font-medium text-lg text-gray-900">
          {language === "en" ? data.name_en : data.name_my}
        </h3>
        <div className="mt-2 text-right font-arabic text-xl leading-relaxed">
          {data.content}
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <div className="text-sm font-medium text-gray-500">Reference</div>
          <div className="text-sm">
            {language === "en" ? data.reference_en : data.reference_my}
          </div>
        </div>

        <div>
          <div className="text-sm font-medium text-gray-500">Meaning</div>
          <div className="text-sm">
            {language === "en" ? data.meaning_en : data.meaning_my}
          </div>
        </div>

        <div>
          <div className="text-sm font-medium text-gray-500 mb-1">
            Categories
          </div>
          <div className="flex flex-wrap gap-1">
            {data.category_names.map((category, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Card>
);

const getColumns = (language: Language): ColumnDef<Doa>[] => [
  {
    accessorKey: language === "en" ? "name_en" : "name_my",
    header: "Name",
    cell: ({ getValue }) => (
      <div className="font-medium text-lg">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ getValue }) => (
      <div className="text-right font-arabic text-xl leading-relaxed px-4">
        {getValue() as string}
      </div>
    ),
  },
  {
    accessorKey: language === "en" ? "reference_en" : "reference_my",
    header: "Reference",
    cell: ({ getValue }) => (
      <div className="text-sm text-gray-600">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: language === "en" ? "meaning_en" : "meaning_my",
    header: "Meaning",
    cell: ({ getValue }) => (
      <div className="text-sm max-w-md">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "category_names",
    header: "Categories",
    cell: ({ getValue }) => (
      <div className="flex flex-wrap gap-1">
        {(getValue() as string[]).map((category, idx) => (
          <Badge key={idx} variant="secondary" className="text-xs">
            {category}
          </Badge>
        ))}
      </div>
    ),
  },
];

interface DataTableProps {
  data: Doa[];
}

// Inside the DataTable component
export function DataTable({ data }: DataTableProps) {
  const [language, setLanguage] = useState<Language>("en");
  const columns = getColumns(language);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Select
          value={language}
          onValueChange={(value: Language) => setLanguage(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="my">Bahasa Melayu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        {table.getRowModel().rows.map((row) => (
          <Link to={`/doa/${row.original.slug}`} className="contents" key={row.id}>
            <MobileDoaCard data={row.original} language={language} />
          </Link>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="bg-gray-50 text-gray-700 font-semibold"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <Link to={`/doa/${row.original.slug}`} className="contents">
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className="py-4">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </Link>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-gray-500"
                    >
                      No results found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex-1 text-sm text-gray-700">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}