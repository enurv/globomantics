import Banner from "./components/Banner";
import "./App.css";
import HouseList, { type houseModel } from "./components/HouseList";
import { useState } from "react";
import House from "./components/House";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const [selectedHouse, setSelectedHouse] = useState<houseModel>();

  return (
    <>
      <ErrorBoundary fallback="Something went wrong">
        <Banner>"Providing houses all over the world"</Banner>
        {selectedHouse ? (
          <House house={selectedHouse} />
        ) : (
          <HouseList selectHouse={setSelectedHouse} />
        )}
      </ErrorBoundary>
    </>
  );
}

export default App;
