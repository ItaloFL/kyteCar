import { NavBar } from "../components/navbar";

import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="grid grid-cols-[350px_minmax(900px,_1fr)]">
      <NavBar />

      <Outlet />
    </div>
  );
}
