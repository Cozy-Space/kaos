import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Sticker } from "../../components/Sticker";
import { useContainerApi } from "../../hooks/ApiHook";

export function ContainerDetail() {
  const params = useParams();
  const containerApi = useContainerApi();
  const [container, setContainer] = useState<any>();

  useEffect(() => {
    if (!params.id) return;
    containerApi.getById(parseInt(params.id)).then(setContainer);
  }, [params]);

  if (!container) return null;
  return (
    <div className="w-full flex flex-row flex-wrap justify-center">
      <img
        className="w-full max-w-xs rounded-md"
        src={"/api/image/" + container.imageUrl}
        alt=""
      />
      <div className="px-8 py-4 flex gap-2 flex-col">
        <h1 className="text-3xl font-bold">{container.name}</h1>
        <p>{container.tags}</p>
        <Sticker code={container.code} />
      </div>
    </div>
  );
}
