interface TagProps {
  text: string;
}

export function Tag({ text }: TagProps) {
  return (
    <div className="inline-block px-2 whitespace-nowrap rounded-full bg-slate-700 text-white">
      {text}
    </div>
  );
}
