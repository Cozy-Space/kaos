import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

interface ImageViewProps {
  open: boolean;
  onClose: () => void;
  imageUrl: string;
}

export function ImageView({ imageUrl, open, onClose }: ImageViewProps) {
  if (!open) return <></>;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed left-0 top-0 opacity-10 w-full h-full bg-slate-900"
      />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <img
          src={imageUrl}
          className=" max-h-screen max-w-md rounded shadow-md border-2 border-white"
        />

        <FontAwesomeIcon
          icon={faX}
          onClick={onClose}
          className="absolute top-4 right-4 bg-white text-slate-900 w-3 h-3 p-2 rounded-full shadow-md"
        />
      </div>
    </>
  );
}
