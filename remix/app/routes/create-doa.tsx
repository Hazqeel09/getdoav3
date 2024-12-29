import { Link } from "@remix-run/react";
import { CircleUserRoundIcon, Github } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { useCreateDoa } from "~/hooks/use-createDoa";

const CreateDoaPage = () => {
  const { title, setTitle, category, setCategory } = useCreateDoa();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-100/40 flex justify-between p-4 px-6 md:p-10 md:px-20 sticky top-0 backdrop-blur-2xl z-10">
        <Link to="/">
          <img src="/logo.svg" alt="GetDoa Logo" className="h-auto w-full" />
        </Link>
        <div className="space-x-4 py-2">
          <CircleUserRoundIcon size={60} color="#006D77" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <h2 className="text-lg mb-6">General Doa after Prayer</h2>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Doa after Prayer</CardTitle>
              <div className="text-center mt-2 text-xl text-gray-800 font-arabic">
                بسم الله الرحمن الرحيم
              </div>
            </CardHeader>
            <CardContent className="min-h-[200px] border rounded-lg m-4 flex items-center justify-center text-gray-400">
              Your choosen doa will appear here
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">CANCEL</Button>
              <Button variant="secondary" className="gap-2">
                SAVE <span className="border rounded p-0.5 text-xs">⌘S</span>
              </Button>
            </CardFooter>
          </Card>

          {/* Right Form */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm">Doa Category:</label>
              <Select onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="e.g.Doa after prayer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning Prayer</SelectItem>
                  <SelectItem value="evening">Evening Prayer</SelectItem>
                  <SelectItem value="night">Night Prayer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm">Doa Title:</label>
              <Input
                placeholder="e.g. Doa after prayer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <Textarea
              placeholder="Search doa by category and choose doa that you want to use"
              className="min-h-[200px]"
            />
          </div>
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
