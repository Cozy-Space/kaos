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
        <img src={imageUrl} alt="" />
      </div>
    </>
  );
}
