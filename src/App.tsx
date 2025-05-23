import { useCallback, useState } from "react";
import "./App.css";
import Banner from "./components/Banner";
import ErrorBoundary from "./components/ErrorBoundary";
import navValues from "./navigation/navValues";
import navigationContext from "./navigation/navigationContext";
import ComponentPicker from "./components/ComponentPicker";
import type { houseModel } from "./components/HouseList";
import { BrowserRouter, Route, Routes } from "react-router";
import HouseList from "./components/HouseList";
import House from "./components/house";

function App() {
  const navigate = useCallback(
    (navTo: string, param: houseModel | null) =>
      setNav({ current: navTo, param, navigate }),
    []
  );
  const [nav, setNav] = useState<{
    current: string;
    param: houseModel | null;
    navigate: (navTo: string, param: houseModel | null) => void;
  }>({ current: navValues.home, param: null, navigate });

  return (
    <BrowserRouter>
      <Banner>
        <div>"Providing houses all over the world"</div>
      </Banner>
      <Routes>
        {/* index means the root of domain which is the home page */}
        <Route index element={<HouseList />} />
        <Route path="house/:id" element={<House />} />
      </Routes>
      <navigationContext.Provider value={nav}>
        <ErrorBoundary fallback="Something went wrong">
          <ComponentPicker currentNavLocation={nav.current} />
        </ErrorBoundary>
      </navigationContext.Provider>
    </BrowserRouter>
  );
}

export default App;
