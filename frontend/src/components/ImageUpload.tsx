import { createRef, useRef, useState } from "react";
import { faUpload, faImage, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { ImageView } from "./ImageView";
import { useAlert } from "../hooks/AlertHook";

interface ImageUploadProps {
  value: string | void;
  onChange: (value: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [viewOpen, setViewOpen] = useState<boolean>(false);
  const fileInput = createRef<HTMLInputElement>();

  const spawn = useAlert();

  const handleChose = () => {
    fileInput.current?.click();
  };

  const handleChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    fetch("/api/image/upload", {
      method: "POST",
      body: form,
    })
      .then((data) => data.json())
      .then((data) => onChange(data.id));
  };

  const handleDelete = () => {
    spawn("u really want dis?", () => onChange(""));
  };

  return (
    <>
      <ImageView
        open={viewOpen}
        imageUrl={"/api/image/" + value}
        onClose={() => setViewOpen(false)}
      />
      <div className="p-1 rounded-lg bg-slate-100 inline-flex gap-2">
        <FontAwesomeIcon
          className="p-1 rounded-md hover:bg-slate-300 transition-colors w-4 h-4"
          onClick={handleChose}
          icon={faUpload}
        />
        <FontAwesomeIcon
          className={classNames("p-1 rounded-md  transition-colors w-4 h-4", {
            " text-slate-300": !value,
            "hover:bg-slate-300 text-slate-900": value,
          })}
          onClick={() => setViewOpen(true)}
          icon={faImage}
        />
        <FontAwesomeIcon
          className={classNames("p-1 rounded-md  transition-colors w-4 h-4", {
            " text-red-200": !value,
            "hover:bg-red-500 hover:text-white text-red-500": value,
          })}
          onClick={handleDelete}
          icon={faRemove}
        />
      </div>
      <input
        ref={fileInput}
        className={"hidden"}
        multiple={false}
        accept="image/jpg"
        type="file"
        onChange={handleChange}
      />
    </>
  );
}
