import React from "react";
import { Search } from "lucide-react";
import Menu from "./menu";
//firebaseAuth 
import { getAuth } from "firebase/auth";
import { useSearch } from "../pages/SearchContext";


function Header() {

  const { search , setSearch } = useSearch();

  return (
    
    <header className="fixed top-0 left-0 w-full h-20 bg-gray-900 text-white flex items-center justify-between px-8 shadow-lg z-50">
      
      {/* Left - Search */}
      <form className="flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product..."
            className="pl-9 pr-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
          />
        </div>

        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition"
        >
          Search
        </button>
      </form>

      {/* Center - Title */}
      <h1 className="text-lg font-semibold text-amber-400 hidden md:block">
        Dashboard Overview
      </h1>

     {/* Right - Profile */}
<div className="flex items-center gap-3 relative">


  <Menu />

  {/* Avatar */}
  <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center font-bold text-gray-900">
{getAuth().currentUser?.email?.charAt(0)?.toUpperCase() || "?"}
  </div>
</div>

    </header>
  );
}

export default Header;
