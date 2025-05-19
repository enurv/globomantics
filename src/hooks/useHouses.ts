import { useEffect, useState } from "react";
import type { houseModel } from "../components/HouseList";

const useHouses = () => {
  const [houses, setHouses] = useState<houseModel[]>([]);

  useEffect(() => {
    const fetchHouses = async () => {
      const response = await fetch("https://localhost:4000/house");
      const houses = await response.json();
      setHouses(houses);
    };
    fetchHouses();
  }, []);

  // when you return hook's state, the component using the hook will re-render when the state changes
  return {houses, setHouses};
};

export default useHouses;
