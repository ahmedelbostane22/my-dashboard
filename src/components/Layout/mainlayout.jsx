import Header from "../Layout/header";
import Sidebar from "../Layout/sidebar";
import { Outlet } from "react-router-dom";
import Post from "./posts";

function MainLayout({ search, setSearch }) {
  return (
    <>
      <Header search={search} setSearch={setSearch} />

      <main className="pt-12 flex h-screen w-screen">
        <Sidebar />
        
     


        <div className="flex-1 bg-gray-100 p-4 overflow-auto w-full ">
          <Outlet  />
        </div>
      </main>
    </>
  );
}

export default MainLayout;
