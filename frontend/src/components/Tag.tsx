interface TagProps {
  text: string;
}

export function Tag({ text }: TagProps) {
  return (
    <div className="inline-block px-2 py-1 uppercase whitespace-nowrap text-xs rounded-full bg-slate-700 text-white">
      {text}
    </div>
  );
}
