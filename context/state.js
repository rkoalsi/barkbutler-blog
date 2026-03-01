import { createContext, useContext } from "react";

// Search is now handled via API calls directly in the search page.
const SearchContext = createContext({ posts: [] });

export const JsonContext = ({ children }) => (
  <SearchContext.Provider value={{ posts: [] }}>
    {children}
  </SearchContext.Provider>
);

export const useSearchContext = () => useContext(SearchContext);
