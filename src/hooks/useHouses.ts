import { useEffect, useState } from "react";
import type { houseModel } from "../components/HouseList";
import loadingStatus from "../helpers/loadingStatus";

const useHouses = () => {
  const [houses, setHouses] = useState<houseModel[]>([]);
  const [loadingState, setLoadingState] = useState<string>(
    loadingStatus.isLoading
  );

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        setLoadingState(loadingStatus.isLoading);
        const response = await fetch("https://localhost:4000/house");
        const houses = await response.json();
        setHouses(houses);
        setLoadingState(loadingStatus.loaded);
      } catch {
        setLoadingState(loadingStatus.hasErrored);
      }
    };
    fetchHouses();
  }, []);

  // when you return hook's state, the component using the hook will re-render when the state changes
  return { houses, setHouses, loadingState };
};

export default useHouses;
