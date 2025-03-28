import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import doaList from "~/data/doa.json";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Send } from "lucide-react";
import { Doa } from "../components/data-table";
import QRCodeCard from "../components/dynamicDoa/qrCode";

type SedekahJeQR = {
  id: number;
  name: string;
  category: string;
  state: string;
  city: string;
  qrImage: string;
  qrContent: string;
  supportedPayment: string[];
};

export const loader: LoaderFunction = async ({ params }) => {
  const { doa } = params;
  const selectedDoa = doaList.find((d) => d.slug === doa);

  if (!selectedDoa) {
    throw new Response("Not Found", { status: 404 });
  }

  const response = await fetch("https://sedekah.je/api/random");
  if (!response.ok) {
    throw new Response("Failed to fetch doa data", { status: response.status });
  }
  const sedekahJeQR: SedekahJeQR = await response.json();

  return Response.json({ selectedDoa, sedekahJeQR });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [
      { title: "Prayer Not Found | GetDoa" },
      {
        name: "description",
        content: "The requested Islamic prayer could not be found.",
      },
    ];
  }

  const { selectedDoa: doa } = data;
  return [
    { title: `GetDoa` },
    {
      name: "description",
      content: `Learn the complete ${doa.name_en} prayer in Arabic with English and Malay translations. Find its meaning, reference, and when to recite this Islamic prayer.`,
    },
    {
      name: "keywords",
      content: `${doa.name_en}, ${
        doa.name_my
      }, islamic prayer, dua, ${doa.category_names?.join(
        ", "
      )}, muslim prayers`,
    },
    // Open Graph tags for social sharing
    {
      property: "og:title",
      content: `${doa.name_my} (${doa.name_en})`,
    },
    {
      property: "og:description",
      content: `Learn the complete ${doa.name_en} prayer in Arabic with English and Malay translations`,
    },
    { property: "og:type", content: "article" },
    // Twitter Card tags
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: `${doa.name_en} - Islamic Prayer` },
    {
      name: "twitter:description",
      content: `Learn the complete ${doa.name_en} prayer in Arabic with English and Malay translations`,
    },
    // Additional SEO tags
    { name: "robots", content: "index, follow" },
    { name: "language", content: "English, Malay, Arabic" },
  ];
};

export default function DoaDetail() {
  const { selectedDoa: doa, sedekahJeQR: sedekahJe } = useLoaderData<{
    selectedDoa: Doa;
    sedekahJeQR: SedekahJeQR;
  }>();
  const [language, setLanguage] = useState<"en" | "my">("en");
  const [shareStatus, setShareStatus] = useState<string>("");

  const handleShare = async () => {
    const shareData = {
      title: `${doa.name_my} (${doa.name_en}) - GetDoa`,
      text: `Learn the complete ${doa.name_en} prayer with translations`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus("Shared successfully!");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus("Link copied to clipboard!");
        setTimeout(() => setShareStatus(""), 2000);
      }
    } catch (err) {
      setShareStatus("Failed to share");
      setTimeout(() => setShareStatus(""), 2000);
    }
  };

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

      {/* Add structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${doa.name_en} (${doa.name_my})`,
            description: `Complete guide to ${doa.name_en} prayer with translations`,
            keywords: [
              ...doa.category_names,
              "Islamic prayer",
              "dua",
              "supplication",
            ],
            articleBody: doa.meaning_en,
            inLanguage: ["en", "my", "ar"],
          }),
        }}
      />

      <main>
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">
            <span lang="my">{doa.name_my}</span>
          </h1>
          <h2 className="text-xl font-semibold" lang="en">
            {doa.name_en}
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Select
              value={language}
              onValueChange={(value: "en" | "my") => setLanguage(value)}
              aria-label="Select language"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="my">Bahasa Melayu</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Button
                onClick={handleShare}
                variant="outline"
                className="flex items-center gap-2 border-primary-outline text-primary-outline"
              >
                Share
                <Send className="h-4 w-4" />
              </Button>
              {shareStatus && (
                <div className="absolute top-full mt-2 right-0 bg-black text-white text-sm py-1 px-2 rounded">
                  {shareStatus}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-centre gap-4">
            <Card className="mb-4 overflow-hidden flex-1">
              <CardHeader>
                <CardTitle>
                  {language === "en" ? doa.name_en : doa.name_my}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="mt-2 text-right font-simpo text-3xl md:text-4xl leading-relaxed md:leading-[2]"
                  lang="ar"
                  dir="rtl"
                >
                  {doa.content}
                </div>
                <div className="space-y-2 mt-4">
                  <section>
                    <h3 className="text-sm font-medium text-gray-500">
                      Reference
                    </h3>
                    <div className="text-sm">
                      {language === "en" ? doa.reference_en : doa.reference_my}
                    </div>
                  </section>
                  <section>
                    <h3 className="text-sm font-medium text-gray-500">
                      Meaning
                    </h3>
                    <div className="text-sm">
                      {language === "en" ? doa.meaning_en : doa.meaning_my}
                    </div>
                  </section>
                  <section>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Categories
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {doa.category_names.map((category, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </section>
                </div>
              </CardContent>
            </Card>

            <nav className="self-end" aria-label="Navigation">
              <Link
                to="/all-doa"
                className="font-small text-black hover:bg-gray-200 px-4 py-2 rounded-xl"
                prefetch="intent"
              >
                &larr; Back to All Doa List
              </Link>
            </nav>

            <QRCodeCard
              name={sedekahJe.name}
              qrContent={sedekahJe.qrContent}
              supportedPayment={sedekahJe.supportedPayment}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

