import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import QrCodeDisplay from "../../components/ui/qrcode-display";
// eslint-disable-next-line import/no-unresolved
import masjid from "/icons/masjid.svg";

export type PaymentMethod = "duitnow" | "TNG" | "boost" | "grabpay";

interface SedekahJeProps {
  name: string;
  qrContent: string;
  supportedPayment: string[];
}

const QRCodeCard = ({ name, qrContent, supportedPayment }: SedekahJeProps) => {
  const SITE_URL = "https://sedekah.je";

  // Define colors for each payment method
  const paymentMethodColors: Record<string, string> = {
    duitnow: "bg-[#ED2C67] text-white",
    tng: "bg-[#015ABF] text-white",
    boost: "bg-[#FF3333] text-white",
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <CardContent className="flex flex-col md:flex-row gap-6 p-6">
        {/* Left Side: QR Code */}
        <div className="flex justify-center md:justify-start">
          <QrCodeDisplay
            qrContent={qrContent}
            supportedPayment={supportedPayment}
            size={250}
          />
        </div>

        {/* Right Side: Name and Details */}
        <div className="flex flex-col gap-4 flex-1">
          {/* Name */}
          <CardHeader className="p-0">
            <CardTitle className="text-2xl font-bold">{name}</CardTitle>
          </CardHeader>

          {/* Supported Payment Methods */}
          <Section title="Supported Payment Methods">
            <div className="flex flex-wrap gap-2">
              {supportedPayment.map((method) => (
                <Badge
                  key={method}
                  variant="secondary"
                  className={`text-xs capitalize ${
                    paymentMethodColors[method.toLowerCase()] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {method}
                </Badge>
              ))}
            </div>
          </Section>

          {/* Concise Disclaimer */}
          <Section title="Pemberitahuan">
          <p className="text-xs text-gray-600">
          Sila pastikan kesahihan kod QR ini atau layari
          <SiteLink url={SITE_URL} /> untuk mendapatkan pilihan yang lebih
          dipercayai.
        </p>
        </Section>
          <Section title="Disclaimer">
            <p className="text-xs text-gray-600">
              Verify the QR code&apos;s validity or visit
              <SiteLink url={SITE_URL} /> for trusted options.
            </p>
            <p className="flex pt-4 text-xs text-gray-600">
            <img src={masjid} alt="Masjid Icon" className="h-9 w-9 mr-2" />
            <p className="flex items-center mt-1">
            Powered by{" "} <SiteLink url={SITE_URL} />
            </p>
            </p>
          </Section>
        </div>
      </CardContent>
    </Card>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="text-left">
    <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
    {children}
  </div>
);

const SiteLink = ({ url }: { url: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-dark hover:text-blue-700 transition-colors ml-1"
  >
sedekah.je
  </a>
);

export default QRCodeCard;