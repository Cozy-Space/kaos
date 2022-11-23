import QRCode from "react-qr-code";
// @ts-ignore
import Barcode from "react-barcode";

interface StickerProps {
  code: string;
}

const san = (): string => {
  const origin = location.origin;
  return origin.charAt(origin.length - 1) !== "/" ? origin + "/" : origin;
};

export function Sticker({ code }: StickerProps) {
  const codeUrl = `${san()}${code}`;

  return (
    <div className="w-[99.1mm] h-[38.1mm] p-4 border border-gray-300 bg-white rounded-md flex justify-between items-center print:border-none">
      <QRCode value={codeUrl} size={100} />
      <Barcode value={code} displayValue={true} height={60} />
    </div>
  );
}
