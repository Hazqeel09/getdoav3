import { QRCodeSVG } from "qrcode.react";
import { type ButtonHTMLAttributes, forwardRef } from "react";

import { cva } from "class-variance-authority";

const labelVariants = cva(
  "relative flex flex-col items-center justify-center rounded-lg",
  {
    variants: {
      supportedPayment: {
        duitnow: "bg-[#ED2C67]",
        tng: "bg-[#015ABF]",
        boost: "bg-[#FF3333]",
      },
    },
  }
);

type Props = {
  qrContent: string;
  supportedPayment: string[];
  size?: number;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const QrCodeDisplay = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  if (!props.qrContent) {
    console.warn("No QR content provided");
    return null;
  }

    function cn(...classes: (string | undefined)[]): string {
        return classes.filter(Boolean).join(" ");
    }
  return (
    <button
      type="button"
      style={{
        width: props.size || 160,
        height: props.size || 160,
        padding: (props.size || 160) * 0.05,
        paddingTop: (props.size || 160) * 0.1,
      }}
      className={cn(
        labelVariants({
          supportedPayment: props.supportedPayment?.[0] as
            | "duitnow"
            | "tng"
            | "boost"
            | undefined,
        })
      )}
      onClick={props.onClick}
      ref={ref}
    >
      <div className="bg-white rounded flex flex-col items-center justify-center w-full h-full">
        {props.supportedPayment?.[0] === "duitnow" && (
          <div
            style={{
              width: (props.size || 160) * 0.2,
              height: (props.size || 160) * 0.2,
            }}
            className="absolute top-0 flex items-center justify-center bg-[#ED2C67] rounded-full border-4 border-white"
          >
            <img
              src="/icons/duitnow.png"
              alt="DuitNow"
              className="object-contain"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}
        {props.supportedPayment?.[0] === "tng" && (
          <div
            style={{
              width: (props.size || 160) * 0.2,
              height: (props.size || 160) * 0.2,
            }}
            className="absolute top-0 flex items-center justify-center"
          >
            <img
              src="/icons/tng.png"
              alt="TNG"
              className="object-contain"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}
        {props.supportedPayment?.[0] === "boost" && (
          <div
            style={{
              width: (props.size || 160) * 0.2,
              height: (props.size || 160) * 0.2,
            }}
            className="absolute top-0 flex items-center justify-center bg-[#EE2E24] rounded-full border-4 border-white"
          >
            <img
              src="/icons/boost.png"
              alt="Boost"
              className="object-contain rounded-full"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}
        <QRCodeSVG
          value={props.qrContent}
          level="M"
          size={(props.size || 160) * 0.7}
        />
      </div>
    </button>
  );
});

QrCodeDisplay.displayName = "QrCodeDisplay";

export default QrCodeDisplay;