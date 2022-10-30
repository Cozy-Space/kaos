import { Route, Routes } from "react-router-dom";
import { Head } from "../components/Head";
import { Containers } from "./dasboard/Containers";
import { Locations } from "./dasboard/Locations";
import { Settings } from "./dasboard/Settings";
import { StickerPage } from "./StickerPage";
import { Welcome } from "./Welcome";

export function Dashboard() {
  return (
    <div className="px-10 py-4">
      <Head />
      <Routes>
        <Route path="containers" element={<Containers />} />
        <Route path="locations" element={<Locations />} />
        <Route path="settings" element={<Settings />} />
        <Route path="sticker" element={<StickerPage />} />
        <Route path="" element={<Welcome />} />
      </Routes>
    </div>
  );
}
