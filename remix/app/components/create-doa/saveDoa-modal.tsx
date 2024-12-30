import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useCreateDoa } from "~/hooks/use-createDoa";
import { Link, useNavigate } from "@remix-run/react";
import type DOA from "~/data/doa.json";
import { useMemo, useRef } from "react";
import * as htmlToImage from "html-to-image";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const SaveDoaModal = ({
  doas,
}: {
  doas: ((typeof DOA)[number] & { id: string })[];
}) => {
  const { title, description, category } = useCreateDoa();
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownloadImage = async () => {
    if (cardRef.current) {
      const dataUrl = await htmlToImage.toPng(cardRef.current);
      const link = document.createElement("a");
      link.download = `${title}-doa.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  const finalDoas = useMemo(() => {
    return {
      title,
      description,
      category,
      doas,
    };
  }, [title, description, category, doas]);

  return (
    <Dialog>
      <DialogTrigger asChild className="transition duration-200">
        <Button variant="secondary" className="gap-2">
          SAVE <span className="border rounded p-0.5 text-xs">⌘S</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="inline-flex items-center gap-2">
            <p className="font-normal">
              Please check before sharing or download for your use
            </p>
          </DialogTitle>
          <Card className="h-[600px] flex flex-col" ref={cardRef}>
            <CardHeader className="p-2">
              <CardTitle className="text-xl">
                <p className="text-center mt-2 text-xl text-gray-800 font-normal">
                  {title}
                </p>
                <p className="text-center mt-2 text-xl text-gray-800 font-arabic">
                  بسم الله الرحمن الرحيم
                </p>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              <ul className="space-y-4 overflow-y-auto h-[350px] pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                {doas.map((item) => (
                  <li
                    key={item.id}
                    className="border p-4 rounded-lg flex flex-col items-center justify-between gap-3 cursor-grab bg-white"
                  >
                    <div className="w-full flex flex-row items-center justify-between">
                      <h3 className="text-lg">{item.name_en}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{item.content}</p>
                    <p className="text-sm text-gray-600">{item.meaning_en}</p>
                    <p className="text-sm text-gray-600">{item.reference_en}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <div className="flex gap-2">
            <Link to="/">
              <Button variant="outline">CANCEL</Button>
            </Link>
            <Button
              onClick={handleDownloadImage}
              variant="secondary"
              className="gap-2"
            >
              Download as Image{" "}
              <span className="border rounded p-0.5 text-xs">⌘D</span>
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
