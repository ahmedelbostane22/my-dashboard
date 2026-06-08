import Header from "./components/Layout/header";
import Sidebar from "./components/Layout/sidebar";
import Post from "./components/Layout/posts";
import AppRoute from "./components/routes/app_route";

import { useEffect } from "react";
import { SearchProvider } from "./components/pages/SearchContext";
import { requestNotificationPermission } from "./components/notifications";

import "./App.css";

function App() {

// const [search, setSearch] = useState("");


  useEffect(() => {
    requestNotificationPermission();
  }, []);
  return (
    <>
    <SearchProvider>
      <AppRoute  />;
      
      </SearchProvider>

      {/* <Header search={search} setSearch={setSearch} />

      <main className="pt-12 flex h-screen w-screen">
        <Sidebar />

        <div className="flex-1 bg-gray-100 p-4 overflow-auto">
          <Post search={search} />
        </div>
      </main> */}
    </>
  );
}

export default App;
