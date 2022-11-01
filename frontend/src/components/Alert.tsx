interface AlertProps {
  text: string;
  onYes: () => void;
  onClose: () => void;
}

export function Alert({ text, onYes, onClose }: AlertProps) {
  const handleYes = () => {
    onYes();
    onClose();
  };

  return (
    <>
      <div
        onClick={onClose}
        className="h-full w-full bg-slate-900 opacity-25 fixed top-0 left-0"
      ></div>
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-white px-10 py-4 w-full max-w-md rounded-lg">
        <div className="p-4 pb-6">{text}</div>
        <div className="flex justify-between   gap-4">
          <button
            onClick={onClose}
            className="bg-red-400 px-8 py-2 rounded-md text-white flex-grow"
          >
            No
          </button>
          <button
            onClick={handleYes}
            className="bg-slate-400 px-8 py-2 rounded-md  text-white flex-grow"
          >
            Yes
          </button>
        </div>
      </div>
    </>
  );
}
