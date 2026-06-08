import React from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";

import {auth} from "./firebase"

import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
  Truck,
  
  Box,
  DollarSign
} from "lucide-react";







function Sidebar() {


const logout = async () => {
  try {
  await signOut(auth);
  console.log("User signed out successfully");
} catch (error) {
  console.error("Error signing out:", error);

} finally {
  window.location.href = "/login";
}
}




  const linkClass = ({ isActive }) =>
    `w-full px-6 py-3 rounded-lg flex items-center gap-3 transition
     ${
       isActive
         ? "bg-violet-800 text-violet-200 font-semibold"
         : "text-gray-300 hover:bg-violet-900 hover:text-white"
     }`;

  return (
    <aside className="fixed top-20 left-0 h-[calc(100vh-80px)] w-64  bg-gray-900 text-yellow-400-lg">
      
      <nav className="py-6 flex flex-col justify-between h-full">
        
        {/* Top Links */}
        <div className="flex flex-col gap-2 px-2">

          <NavLink to="/MainPage" className={linkClass}> 
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>
          


          <NavLink to="/" className={linkClass}>
            <UserPlus size={18} />
            add Product
          </NavLink>


          
          <NavLink to="/Category" className={linkClass}>
            <UserPlus size={18} />
            Category
          </NavLink>


          <NavLink to="/users" className={linkClass}>
            <Users size={18} />
            Users
          </NavLink>

          <NavLink to="/orders" className={linkClass}>
            <ShoppingCart size={18} />
            Orders
          </NavLink>
           <NavLink to="/sales" className={linkClass}>
            <DollarSign size={18} />
            Sales
          </NavLink>
       <NavLink to="/Invoices" className={linkClass}>
            <DollarSign size={18} />
            Invoice
          </NavLink>
          
       <NavLink to="/Suppliers" className={linkClass}>
            <Users size={18} />
            Suppliers
          </NavLink>


          
<NavLink to="/DeliveryTable" className={linkClass}>
  <Truck size={18} />  {/* أيقونة التوصيل */}
  Delivery
</NavLink>


        <NavLink to="/InventoryTable" className={linkClass}>
  <Box size={18} />  {/* أيقونة المخزن */}
  Inventory
</NavLink>


          <NavLink to="/settings" className={linkClass}>
            <Settings size={18} />
            Settings
          </NavLink>
        </div>

        {/* Auth */}
        <div className="flex flex-col gap-2 px-2">
          {/* <NavLink to="/login" className={linkClass}>
            <LogIn size={18} />
            Login
          </NavLink>

          <NavLink to="/signup" className={linkClass}>
            <UserPlus size={18} />
            Signup
          </NavLink> */}

          <button  onClick={logout} className="flex items-center gap-3 px-6 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition">
            <LogOut size={18} />
            

            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
