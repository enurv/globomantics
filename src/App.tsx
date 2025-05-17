import Banner from "./components/Banner";
import "./App.css";
import HouseList, { type houseModel } from "./components/HouseList";
import { useState } from "react";
import House from "./components/House";

function App() {
  const [selectedHouse, setSelectedHouse] = useState<houseModel>();

  return (
    <>
      <Banner>"Providing houses all over the world"</Banner>
      {selectedHouse ? <House house={selectedHouse} /> : <HouseList selectHouse={setSelectedHouse}/>}
    </>
  );
}

export default App;
