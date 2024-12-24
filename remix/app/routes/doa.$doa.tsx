import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import fs from "fs/promises";
import path from "path";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Doa } from "../components/data-table";

export const loader: LoaderFunction = async ({ params }) => {
  const { doa } = params;
  const filePath = path.join(process.cwd(), "app", "data", "doa.json");
  const fileContents = await fs.readFile(filePath, "utf-8");
  const doaList: Doa[] = JSON.parse(fileContents);
  const selectedDoa = doaList.find((d) => d.name_my === doa);

  if (!selectedDoa) {
    throw new Response("Not Found", { status: 404 });
  }

  return json(selectedDoa);
};

export default function DoaDetail() {
  const doa = useLoaderData<Doa>();
  const [language, setLanguage] = useState<"en" | "my">("en");

  return (
    <div className="bg-blue-50 min-h-screen p-4">
      <header className="flex justify-center pb-4">
        <Link to="/">
          <img src="/logo.svg" alt="GetDoa Logo" className="h-auto w-full" />
        </Link>
      </header>
      <h1 className="text-2xl font-bold mb-4 text-center">Doa List</h1>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Select value={language} onValueChange={(value: "en" | "my") => setLanguage(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="my">Bahasa Melayu</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Card className="mb-4 overflow-hidden">
          <CardHeader>
            <CardTitle>{language === "en" ? doa.name_en : doa.name_my}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-2 text-right font-arabic text-xl leading-relaxed">
              {doa.content}
            </div>
            <div className="space-y-2 mt-4">
              <div>
                <div className="text-sm font-medium text-gray-500">Reference</div>
                <div className="text-sm">
                  {language === "en" ? doa.reference_en : doa.reference_my}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Meaning</div>
                <div className="text-sm">
                  {language === "en" ? doa.meaning_en : doa.meaning_my}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Categories</div>
                <div className="flex flex-wrap gap-1">
                  {doa.category_names.map((category, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="fixed right-8 ">
          <Link to="/all-doa" className="font-small text-black hover:bg-gray-200 px-4 py-2 rounded-xl ">
            &larr; Back to All Doa List
          </Link>
        </div>
      </div>
    </div>
  );
}