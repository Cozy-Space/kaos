import {
  faCaretRight,
  faLocationDot,
  faSignature,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { ContainerList } from "../../components/ContainerList";
import { Select } from "../../components/Select";
import { TagInput } from "../../components/TagInput";
import { useSmartList } from "../../hooks/SmartListHook";
import { Container } from "../../types/Container";
import { SmartList } from "../../types/SmartList";

export function SmartListDetail() {
  const [list, setList] = useState<SmartList>();
  const [containers, setContainers] = useState<Container[]>();
  const params = useParams();
  const smartListApi = useSmartList();
  const navigate = useNavigate();

  const load = async () => {
    setList(await smartListApi.findById(parseInt(params.id || "")));
  };

  const loadContainers = async () => {
    if (list) setContainers(await smartListApi.getContainers(list.id));
  };

  useEffect(() => {
    loadContainers();
  }, [list]);

  const handleSave = async () => {
    if (list) await smartListApi.update(list);
    load();
  };

  const handleRemove = async () => {
    if (list) {
      await smartListApi.remove(list);
      navigate("/dashboard/smartlists");
    }
  };

  const handleUpdate = async (attribute: string, value: string) => {
    setList((current) => ({ ...current, [attribute]: value } as SmartList));
  };

  useEffect(() => {
    load();
  }, []);

  if (!params.id) return null;
  if (!list) return null;
  return (
    <div className="w-full flex flex-col  text-left">
      <h1 className="text-left text-2xl text-slate-700 font-semibold pb-5">
        Smart Lists <FontAwesomeIcon icon={faCaretRight} /> {list.name}
      </h1>
      <div className="grid md:grid-cols-[auto_1fr] grid-cols-1 py-3 gap-x-8 gap-y-4 pt-6">
        <label>
          <FontAwesomeIcon icon={faSignature} className="pr-2" />
          Name
        </label>
        <input
          type="text"
          defaultValue={list.name}
          onChange={(e) => handleUpdate("name", e.currentTarget.value)}
          className=" font-mono"
        />
        <div className="md:col-span-2 border-b-2 border-slate-100"></div>
        <label>
          <FontAwesomeIcon icon={faLocationDot} className="pr-2" />
          Location
        </label>
        <input
          type="text"
          defaultValue={list.locations}
          onChange={(e) => handleUpdate("locations", e.currentTarget.value)}
          className=" font-mono"
        />
        <div className="md:col-span-2 border-b-2 border-slate-100"></div>
        <label>
          <FontAwesomeIcon icon={faTags} className="pr-2" />
          Tags
        </label>
        <TagInput
          defaultValue={list.tags}
          editable
          onChange={(value) => handleUpdate("tags", value)}
        />
      </div>

      {containers && (
        <div className="border border-slate-800 rounded-lg overflow-hidden mt-4">
          <h1 className="font-semibold text-md border-b border-slate-300 py-2  px-2 bg-slate-800 text-white  ">
            Containers
          </h1>
          <ContainerList
            onClick={(id) => navigate(`/dashboard/containers/${id}`)}
            query=""
            containers={containers}
          />
        </div>
      )}
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
