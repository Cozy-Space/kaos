import { Route, Routes } from "react-router-dom";
import { Head } from "../components/Head";
import { ContainerDetail } from "./dasboard/ContainerDetail";
import { Containers } from "./dasboard/Containers";
import { Locations } from "./dasboard/Locations";
import { Settings } from "./dasboard/Settings";
import { StickerPage } from "./StickerPage";
import { Welcome } from "./Welcome";

export function Dashboard() {
  return (
    <div className=" gap-6 pr-6 pl-24 min-h-screen text-center ">
      <Head />
      <Routes>
        <Route path="containers" element={<Containers />} />
        <Route path="containers/:id" element={<ContainerDetail />} />
        <Route path="locations" element={<Locations />} />
        <Route path="settings" element={<Settings />} />
        <Route path="sticker" element={<StickerPage />} />
        <Route path="" element={<Welcome />} />
      </Routes>
    </div>
  );
}
