import { faSpinner, faLock, faGears } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Sticker } from "../components/Sticker";
import { useCodes } from "../hooks/CodesHook";

export function StickerPage() {
  const codesApi = useCodes();

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        className="flex items-center justify-center gap-1 px-2 py-3 relative text-white bg-slate-600 rounded-lg
        hover:bg-slate-700 active:top-0.5 transition-colors"
        onClick={codesApi.fetchCodes}
      >
        <div>Codes Generieren</div>
        {codesApi.loading ? (
          <FontAwesomeIcon className="w-3 h-3 animate-spin" icon={faSpinner} />
        ) : (
          <FontAwesomeIcon className="w-3 h-3" icon={faGears} />
        )}
      </button>
      {codesApi.error && <div className="text-red-400">Generate failed</div>}
      <div className="w-[210mm] h-[297mm] py-[15.15mm] px-[5mm] border border-gray-300 print:border-none print:left-0 print:top-0 print:fixed print:bg-white flex flex-wrap justify-between content-start">
        {codesApi.codes.map((code) => (
          <Sticker code={code} />
        ))}
      </div>
    </div>
  );
}
