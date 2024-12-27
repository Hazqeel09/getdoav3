import { QRCodeSVG } from "qrcode.react";
import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";

export type PaymentMethod = "duitnow" | "fpx" | "boost" | "grabpay";

interface SedekahJeProps {
  name: string;
  qrContent: string;
  supportedPayment: string[];
}

const QRCodeCard = ({ name, qrContent, supportedPayment }: SedekahJeProps) => {
  const SITE_URL = "https://sedekah.je";

  return (
    <Card className="mb-4 overflow-hidden">
      <CardHeader className="items-center space-y-2">
        <CardTitle>{name}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-center gap-6">
          <QRCodeSVG
            value={qrContent}
            size={160}
            className="rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          />

          <div className="w-full space-y-6">
            <Section title="Supported Payment Methods">
              <div className="flex flex-wrap justify-center gap-2">
                {supportedPayment.map((method) => (
                  <Badge
                    key={method}
                    variant="secondary"
                    className="text-xs capitalize"
                  >
                    {method}
                  </Badge>
                ))}
              </div>
            </Section>

            <DisclaimerSection siteUrl={SITE_URL} />
          </div>
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
  <div className="text-center">
    <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
    {children}
  </div>
);

const DisclaimerSection = ({ siteUrl }: { siteUrl: string }) => (
  <div className="space-y-4">
    <Section title="Disclaimer">
      <p className="text-xs text-gray-600">
        Please verify the validity of the QR code or visit{" "}
        <SiteLink url={siteUrl} /> for more reliable options.
      </p>
    </Section>

    <Section title="Pemberitahuan">
      <p className="text-xs text-gray-600">
        Sila pastikan kesahihan kod QR ini atau layari{" "}
        <SiteLink url={siteUrl} /> untuk mendapatkan pilihan yang lebih
        dipercayai.
      </p>
    </Section>
  </div>
);

const SiteLink = ({ url }: { url: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 hover:text-blue-700 transition-colors underline"
  >
    sedekah.je
  </a>
);

export default QRCodeCard;
