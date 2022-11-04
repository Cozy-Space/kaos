import {
  faLocationDot,
  faBarcode,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Sticker } from "../../components/Sticker";
import { Tag } from "../../components/Tag";
import { useContainerApi } from "../../hooks/ApiHook";
import { Container } from "../../types/Container";

export function ContainerDetail() {
  const params = useParams();
  const containerApi = useContainerApi();
  const [container, setContainer] = useState<Container>();

  useEffect(() => {
    if (!params.id) return;
    containerApi.getById(parseInt(params.id)).then(setContainer);
  }, [params]);

  if (!container) return null;
  return (
    <div className="w-full max-w-2xl inline-flex flex-col py-2 px-4 text-left pt-10">
      <div
        className="w-full h-72 -z-10 rounded-lg shadow-sm relative"
        style={{
          backgroundImage: `url(/api/image/${container.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute bottom-4 right-4 text-white gap-2 flex">
          <button>Upload</button>
          <button>Remove</button>
        </div>
      </div>
      <input type="text" value={container.name} className="text-3xl py-4" />
      <div className="grid md:grid-cols-[auto_1fr] grid-cols-1 p-3 gap-x-8 gap-y-4">
        <label>
          <FontAwesomeIcon icon={faTags} className="pr-2" />
          Tags
        </label>
        {/* <input type="text" value={container.tags} /> */}
        <div className="flex flex-wrap gap-2">
          {container.tags?.split(",").map((tag) => (
            <Tag text={tag} />
          ))}
        </div>
        <div className="md:col-span-2 border-b-2 border-slate-100"></div>

        <label>
          <FontAwesomeIcon icon={faBarcode} className="pr-2" />
          Code
        </label>
        <input type="text" value={container.code} className=" font-mono" />
        <div className="md:col-span-2 border-b-2 border-slate-100"></div>

        <label>
          <FontAwesomeIcon icon={faLocationDot} className="pr-2" />
          Location
        </label>
        <input type="text" value={container.location?.name} />
      </div>

      <div className="flex gap-4 md:justify-end justify-center">
        <button>Delete</button>
        <button>Save</button>
      </div>
    </div>
  );
}
