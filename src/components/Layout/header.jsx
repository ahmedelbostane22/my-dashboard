import React from "react";
import { Search } from "lucide-react";
import Menu from "./menu";
import { getAuth } from "firebase/auth";
import { useSearch } from "../pages/SearchContext";
import { NavLink } from "react-router-dom";

function Header() {
  const { search, setSearch } = useSearch();

  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-gray-900 text-white flex items-center justify-between px-3 md:px-8 shadow-lg z-50">
      
      {/* Search */}
      <form
        className="flex items-center gap-2 flex-1 max-w-xs md:max-w-md"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full pl-9 pr-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
          />
        </div>

        <button
          type="submit"
          className="hidden sm:block bg-amber-500 hover:bg-amber-600 text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition"
        >
          Search
        </button>
      </form>

      {/* Title */}
      <h1 className="hidden lg:block text-lg font-semibold text-amber-400">
        Dashboard Overview
      </h1>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <Menu />

        {getAuth().currentUser ? (
          <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center font-bold text-gray-900">
            {getAuth().currentUser.email.charAt(0).toUpperCase()}
          </div>
        ) : (
          <NavLink
            to="/login"
            className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
          >
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;