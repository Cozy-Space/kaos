import { faSpinner, faBarcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useState } from "react";
import { Button } from "./Button";

interface Props {
  onScan: (data: string) => void;
  onFocus: () => void;
}

export function CodeReader({ onScan, onFocus }: Props) {
  const [listening, setListening] = useState(false);
  const [code, setCode] = useState("");

  const handleActive = () => {
    setListening(true);
    onFocus();
  };

  const handleKeyDown = (event: any) => {
    const key = event.key;

    if (["Enter", "Tab"].includes(key)) {
      onScan(code);
      setCode("");
      return;
    }

    setCode(code + key);
  };

  return (
    <Button
      onBlur={() => setListening(false)}
      onFocus={handleActive}
      onKeyDown={handleKeyDown}
      className={classNames(
        { "bg-slate-900 text-white": listening },
        { "bg-slate-200": !listening }
      )}
    >
      QR Code Scanner
      {listening ? (
        <FontAwesomeIcon icon={faSpinner} className={"w-4 animate-spin"} />
      ) : (
        <FontAwesomeIcon icon={faBarcode} className={"w-4"} />
      )}
    </Button>
  );
}
