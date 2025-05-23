import { useCallback, useState } from "react";
import "./App.css";
import Banner from "./components/Banner";
import ErrorBoundary from "./components/ErrorBoundary";
import navValues from "./navigation/navValues";
import navigationContext from "./navigation/navigationContext";
import ComponentPicker from "./components/ComponentPicker";
import type { houseModel } from "./components/HouseList";

function App() {
  const navigate = useCallback(
    (navTo: string, param: houseModel) =>
      setNav({ current: navTo, param, navigate }),
    []
  );
  const [nav, setNav] = useState<{
    current: string;
    param: houseModel | null;
    navigate: (navTo: string, param: houseModel) => void;
  }>({ current: navValues.home, param: null, navigate });

  return (
    <>
      <navigationContext.Provider value={nav}>
        <ErrorBoundary fallback="Something went wrong">
          <Banner>"Providing houses all over the world"</Banner>
          <ComponentPicker currentNavLocation={nav.current} />
        </ErrorBoundary>
      </navigationContext.Provider>
    </>
  );
}

export default App;
