import {
  faLocationDot,
  faBarcode,
  faTags,
  faSignature,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { ImageUpload } from "../../components/ImageUpload";
import { Select } from "../../components/Select";
import { Sticker } from "../../components/Sticker";
import { Tag } from "../../components/Tag";
import { TagInput } from "../../components/TagInput";
import { useContainerApi, useLocationApi } from "../../hooks/ApiHook";
import { Container } from "../../types/Container";
import { Location } from "../../types/Location";

export function ContainerDetail() {
  const params = useParams();
  const containerApi = useContainerApi();
  const locationApi = useLocationApi();
  const [container, setContainer] = useState<Partial<Container>>();
  const navigate = useNavigate();

  const handleUpdate = (name: string, value: any) => {
    setContainer((current) => ({ ...current, [name]: value }));
  };

  const handleSave = async () => {
    if (!container) return;
    await containerApi.save(container);
    navigate("/dashboard/containers");
  };

  const handleRemove = async () => {
    if (!container) return;

    await containerApi.remove(container);
    navigate("/dashboard/containers");
  };

  useEffect(() => {
    if (!params.id) return;
    if (params.id === "new") {
      setContainer({
        name: "",
        tags: "",
        code: "",
        location: undefined,
        imageUrl: "",
      });
      return;
    }
    containerApi.getById(parseInt(params.id)).then(setContainer);
  }, [params]);

  useEffect(() => {
    locationApi.load();
  }, []);

  if (!container) return null;
  return (
    <div className="w-full flex flex-col  text-left">
      <h1 className="text-left text-2xl text-slate-700 font-semibold pb-5">
        Container <FontAwesomeIcon icon={faCaretRight} /> {container.name}
      </h1>
      <div
        className="w-full h-72 rounded-lg shadow-sm relative "
        style={{
          backgroundImage: `url(/api/image/${container.imageUrl || "dummy"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute bottom-3 right-4">
          <ImageUpload
            value={container.imageUrl}
            onChange={(value) => handleUpdate("imageUrl", value)}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-[auto_1fr] grid-cols-1 py-3 gap-x-8 gap-y-4 pt-6">
        <label>
          <FontAwesomeIcon icon={faSignature} className="pr-2" />
          Name
        </label>
        <input
          type="text"
          defaultValue={container.name}
          onChange={(e) => handleUpdate("name", e.currentTarget.value)}
          className=" font-mono"
        />
        <div className="md:col-span-2 border-b-2 border-slate-100"></div>
        <label>
          <FontAwesomeIcon icon={faTags} className="pr-2" />
          Tags
        </label>
        {/* <input type="text" value={container.tags} /> */}
        <TagInput
          defaultValue={container?.tags}
          editable
          onChange={(value) => handleUpdate("tags", value)}
        />

        <div className="md:col-span-2 border-b-2 border-slate-100"></div>

        <label>
          <FontAwesomeIcon icon={faBarcode} className="pr-2" />
          Code
        </label>

        <input
          onChange={(e) => handleUpdate("code", e.currentTarget.value)}
          type="text"
          value={container.code}
          className=" font-mono"
        />
        <div className="md:col-span-2 border-b-2 border-slate-100"></div>

        <label>
          <FontAwesomeIcon icon={faLocationDot} className="pr-2" />
          Location
        </label>
        <Select
          onChange={(id) => handleUpdate("location", { id })}
          defaultId={container?.location?.id}
          placeholder="Select Location"
          values={locationApi.data.map((location) => ({
            id: location.id,
            value: location.name,
          }))}
        />
        {/* <input type="text" value={container.location?.name} /> */}
      </div>

      <div className="flex mt-4 gap-2 md:justify-end justify-center">
        <Button className="bg-red-500 text-white" onClick={handleRemove}>
          Delete
        </Button>
        <Button className="bg-slate-700 text-white" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
