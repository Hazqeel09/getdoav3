import { Link } from "@remix-run/react";
import { createId } from "@paralleldrive/cuid2";
import { CircleUserRoundIcon } from "lucide-react";
import cta from "../data/cta.json";
import Icon from "../components/icon";
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
import { useState } from "react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Reorder } from "motion/react";
import { SaveDoaModal } from "~/components/create-doa/saveDoa-modal";

const CreateDoaPage = () => {
  const [doaList, setDoaList] = useState(
    DOA.map((doa) => ({ ...doa, id: createId() }))
  );

  const { title, description, category, setCategory } = useCreateDoa();
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
        <h2 className="text-lg mb-6">{description}</h2>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Card */}
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">{title}</CardTitle>
              <div className="text-center mt-2 text-xl text-gray-800 font-simpo">
                بسم الله الرحمن الرحيم
              </div>
            </CardHeader>
            <CardContent className="flex-1 border rounded-lg m-4 flex items-center justify-center">
              {selectedDoas.length === 0 ? (
                <p className="text-lg text-gray-400">
                  Your choosen doa will appear here
                </p>
              ) : (
                <Reorder.Group
                  axis="y"
                  values={selectedDoas}
                  onReorder={setSelectedDoas}
                  className="space-y-4 overflow-y-auto h-[350px] pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
                >
                  {selectedDoas.map((item) => (
                    <Reorder.Item
                      key={item.id}
                      value={item}
                      className="border p-4 rounded-lg flex flex-col items-center justify-between gap-3 cursor-grab bg-white"
                    >
                      <div className="w-full flex flex-row items-center justify-between">
                        <h3 className="text-lg">{item.name_en}</h3>
                        <Button
                          variant="ghost"
                          className="text-[#57AAB4] hover:text-[#57AAff]"
                          onClick={() => {
                            setSelectedDoas(
                              selectedDoas.filter((d) => d.id !== item.id)
                            );
                            setDoaList([...doaList, item]);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">{item.content}</p>
                      <p className="text-sm text-gray-600">{item.meaning_en}</p>
                      <p className="text-sm text-gray-600">
                        {item.reference_en}
                      </p>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link to="/">
                <Button variant="outline">CANCEL</Button>
              </Link>
              <SaveDoaModal doas={selectedDoas} />
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
                          onClick={() => {
                            setSelectedDoas([...selectedDoas, doa]);
                            setDoaList(doaList.filter((d) => d.id !== doa.id));
                          }}
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
          <p className="w-fit">
            &copy; GetDoa.com {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="flex items-center">
            {cta.map((item) => (
              <a href={item.link} key={item.id} className="p-2">
                <Icon name={item.id} className="size-4" />
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CreateDoaPage;
