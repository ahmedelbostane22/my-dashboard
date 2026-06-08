import { Routes, Route } from "react-router-dom";
import MainLayout from "../Layout/mainlayout";

import HomePage from "../pages/homePage";
import Login from "../pages/login";
import Signup from "../pages/siginup";
import User from "../pages/users";
import Order from "../pages/orders";
import Sales from "../pages/sales";
import InventoryTable from "../pages/stowage";
import DeliveryTable from "../pages/delivery";
import Category from "../pages/category";
import ProtectedRoute from "../pages/ProtectedRoute";
import StartPage from "../Layout/startPage";
import OrderDetails from "../pages/orderDetails";
import NotFound from "../pages/notFound";
import MainPage from "../pages/mainPage";
import { Invoices } from "../pages/invoices/Invoice";
import Suppliers from "../pages/suppliers/supplier";



function AppRoute() {
  return (
    <Routes>
      <Route path="/Login" element={<Login  />} />
<Route path="/signup" element={<Signup />} />
      <Route
        element={<MainLayout
           />}
      >
<Route path="/" element={<StartPage
 
  />} />
<Route path="/home" element={<HomePage  />} />
<Route path="/Invoices" element={<Invoices />} />

<Route path="/users" element={<User />} />
<Route path="/orders" element={<Order />} />
<Route path="/sales" element={<Sales />} />
 <Route path="/InventoryTable"element={<InventoryTable />} />
 <Route path="/DeliveryTable"element={<DeliveryTable />} />
 <Route path="/Category"element={<Category />} />
 <Route path="/OrderDetails/:userId/:orderId" element={<OrderDetails />} />
 <Route path="*" element={<NotFound />} />
 <Route path="/MainPage" element={<MainPage />} />
 <Route path="/Suppliers" element={<Suppliers />} />

 



     
      </Route>

    </Routes>
  );
}

export default AppRoute;
