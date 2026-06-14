import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
  UserPlus,
  Truck,
  Box,
  DollarSign,
  Menu,
  X,
} from "lucide-react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      window.location.href = "/login";
    }
  };

  const linkClass = ({ isActive }) =>
    `w-full px-6 py-3 rounded-lg flex items-center gap-3 transition
    ${
      isActive
        ? "bg-violet-800 text-violet-200 font-semibold"
        : "text-gray-300 hover:bg-violet-900 hover:text-white"
    }`;

  return (
    <>
      {/* زر الموبايل */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-violet-700 text-white p-2 rounded-lg"
      >
        <Menu size={24} />
      </button>

      {/* الخلفية السوداء */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-gray-900 z-50
          transform transition-transform duration-300
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }
          md:translate-x-0 md:top-20 md:h-[calc(100vh-80px)]
        `}
      >
        {/* زر الإغلاق للموبايل */}
        <div className="flex justify-end p-4 md:hidden">
          <button onClick={() => setIsOpen(false)}>
            <X className="text-white" />
          </button>
        </div>

        <nav className="py-6 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-2 px-2">
            <NavLink
              to="/MainPage"
              className={linkClass}
              onClick={() => setIsOpen(false)}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink
              to="/"
              className={linkClass}
              onClick={() => setIsOpen(false)}
            >
              <UserPlus size={18} />
              Add Product
            </NavLink>

            <NavLink
              to="/Category"
              className={linkClass}
              onClick={() => setIsOpen(false)}
            >
              <UserPlus size={18} />
              Category
            </NavLink>

            <NavLink
              to="/users"
              className={linkClass}
              onClick={() => setIsOpen(false)}
            >
              <Users size={18} />
              Users
            </NavLink>

            <NavLink
              to="/orders"
              className={linkClass}
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart size={18} />
              Orders
            </NavLink>

            <NavLink
              to="/sales"
              className={linkClass}
              onClick={() => setIsOpen(false)}
            >
              <DollarSign size={18} />
              Sales
            </NavLink>

            <NavLink
              to="/Invoices"
              className={linkClass}
              onClick={() => setIsOpen(false)}
            >
              <DollarSign size={18} />
              Invoice
            </NavLink>

            <NavLink
              to="/Suppliers"
              className={linkClass}
              onClick={() => setIsOpen(false)}
            >
              <Users size={18} />
              Suppliers
            </NavLink>

            <NavLink
              to="/DeliveryTable"
              className={linkClass}
              onClick={() => setIsOpen(false)}
            >
              <Truck size={18} />
              Delivery
            </NavLink>

            <NavLink
              to="/InventoryTable"
              className={linkClass}
              onClick={() => setIsOpen(false)}
            >
              <Box size={18} />
              Inventory
            </NavLink>

            <NavLink
              to="/settings"
              className={linkClass}
              onClick={() => setIsOpen(false)}
            >
              <Settings size={18} />
              Settings
            </NavLink>
          </div>

          <div className="px-2 pb-4">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-6 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;