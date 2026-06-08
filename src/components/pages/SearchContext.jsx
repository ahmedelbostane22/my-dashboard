import { createContext, useContext, useState } from "react";

// 1. إنشاء الـ Context
const SearchContext = createContext();

// 2. Provider لتغليف الـ App
export function SearchProvider({ children }) {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

// 3. Hook لاستخدام الـ Context بسهولة
// eslint-disable-next-line react-refresh/only-export-components
export function useSearch() {
  return useContext(SearchContext);
}
