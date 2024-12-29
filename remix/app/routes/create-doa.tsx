import { Link } from "@remix-run/react";
import { createId } from "@paralleldrive/cuid2";
import { CircleUserRoundIcon, Github } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useCreateDoa } from "~/hooks/use-createDoa";
import DOA from "~/data/doa.json";
import { useMemo, useState } from "react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

const CreateDoaPage = () => {
  const doaList = useMemo(
    () => DOA.map((doa) => ({ ...doa, id: createId() })),
    []
  );

  const { category, setCategory } = useCreateDoa();
  const [selectedDoas, setSelectedDoas] = useState<typeof doaList>([]);
  const [search, setSearch] = useState("");

  const filteredDoaList = doaList.filter(
    (doa) =>
      doa.name_en.toLowerCase().includes(search.toLowerCase()) ||
      doa.content.toLowerCase().includes(search.toLowerCase()) ||
      doa.meaning_en.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-100/40 flex justify-between p-4 px-6 md:p-2 md:px-20 sticky top-0 backdrop-blur-2xl z-10">
        <Link to="/">
          <img src="/logo.svg" alt="GetDoa Logo" className="h-auto w-full" />
        </Link>
        <div className="flex items-center justify-center">
          <CircleUserRoundIcon size={30} color="#006D77" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <h2 className="text-lg mb-6">General Doa after Prayer</h2>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Card */}
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">Doa after Prayer</CardTitle>
              <div className="text-center mt-2 text-xl text-gray-800 font-arabic">
                بسم الله الرحمن الرحيم
              </div>
            </CardHeader>
            <CardContent className="flex-1 border rounded-lg m-4 flex items-center justify-center">
              {selectedDoas.length === 0 ? (
                <p className="text-lg text-gray-400">Your choosen doa will appear here</p>
              ) : (
                <ul className="space-y-4 overflow-y-auto h-[350px] pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                  {selectedDoas.map((doa, i) => (
                    <li
                      key={i}
                      className="border p-4 rounded-lg flex flex-col items-center justify-between gap-3"
                    >
                      <div className="w-full flex flex-row items-center justify-between">
                        <h3 className="text-lg">{doa.name_en}</h3>
                        <Button
                          variant="ghost"
                          className="text-[#57AAB4] hover:text-[#57AAff]"
                          onClick={() =>
                            setSelectedDoas(
                              selectedDoas.filter((d) => d.id !== doa.id)
                            )
                          }
                        >
                          Remove
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">{doa.content}</p>
                      <p className="text-sm text-gray-600">{doa.meaning_en}</p>
                      <p className="text-sm text-gray-600">
                        {doa.reference_en}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">CANCEL</Button>
              <Button variant="secondary" className="gap-2">
                SAVE <span className="border rounded p-0.5 text-xs">⌘S</span>
              </Button>
            </CardFooter>
          </Card>

          {/* Right Card */}
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">Select Doa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 flex-1 overflow-hidden">
              <div className="space-y-2">
                <label className="text-sm">Doa Category:</label>
                <Select onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select category"
                      defaultValue="morning"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning Prayer</SelectItem>
                    <SelectItem value="evening">Evening Prayer</SelectItem>
                    <SelectItem value="night">Night Prayer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col w-full">
                <Label className="text-sm">Search Doa:</Label>
                <Input
                  placeholder="Search by title, content or meaning..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="space-y-4 overflow-y-auto h-[350px] pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                {filteredDoaList.map((doa, i) => {
                  return (
                    <div
                      key={i}
                      className="border p-4 rounded-lg flex flex-col items-center justify-between gap-3"
                    >
                      <div className="w-full flex flex-row items-center justify-between">
                        <h3 className="text-lg">{doa.name_en}</h3>
                        <Button
                          variant="ghost"
                          className="text-[#57AAB4] hover:text-[#57AAff]"
                          onClick={() =>
                            setSelectedDoas([...selectedDoas, doa])
                          }
                        >
                          Add Doa
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">{doa.content}</p>
                      <p className="text-sm text-gray-600">{doa.meaning_en}</p>
                      <p className="text-sm text-gray-600">
                        {doa.reference_en}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="flex justify-between items-center mt-20 text-sm text-gray-600">
          <p>© detDoa.com 2023. All rights reserved</p>
          <div className="flex gap-4">
            <Link to="https://x.com" className="hover:text-gray-900">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
              </svg>
            </Link>
            <Link to="#" className="hover:text-gray-900">
              <Github className="w-5 h-5" />
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CreateDoaPage;
