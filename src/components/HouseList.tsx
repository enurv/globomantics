import { useCallback } from "react";
import useHouses from "../hooks/useHouses";
import AddButton from "./AddButton";
import HouseRow from "./HouseRow";
import loadingStatus from "../helpers/loadingStatus";
import LoadingIndicator from "./LoadingIndicator";

export interface houseModel {
  id: number;
  address: string;
  country: string;
  price: number;
  photo: string;
  description: string;
}

const HouseList = ({
  selectHouse,
}: {
  selectHouse: (house: houseModel) => void;
}) => {
  // State is readonly use setHouses to change the state
  // const [counter, setCounter] = useState(0);
  //! setCounter can take a function parameter that gets the current state
  //! if there is multiple call to setter react can batch those calls for efficiency only updating the state when batch completes
  //! this approach ensures that current is set by the previous call hence this approach is reccomended
  //setCounter((current) => current + 1);

  const { houses, setHouses, loadingState } = useHouses();
  const addHouse = useCallback(async () => {
    const newHouse = {
      address: "32 Valley Way, New york",
      country: "USA",
      price: 1000000,
    };
    const response = await fetch("https://localhost:4000/house", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHouse),
    });
    const responseHouse = await response.json();
    setHouses((current) => [...current, responseHouse]);
  }, []);

  if (loadingState !== loadingStatus.loaded) { // component can return null to not render anything
    return <LoadingIndicator loadingState={loadingState} />;
  }

  return (
    <>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Houses currently on the market
        </h5>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Address</th>
            <th>Country</th>
            <th>Asking Price</th>
          </tr>
        </thead>
        <tbody>
          {houses.map((h) => (
            // key property is needed whenever an array of Reacts elements is created on the jsx/tsx
            // if there is no unique id value you can use the map index as a last resort but this can cause problems when the item orders have changed
            <HouseRow key={h.id} house={h} selectHouse={selectHouse} />
            // <HouseRow {...h} key={h.id} />  object destructing alternative but could cause performance issues
          ))}
        </tbody>
      </table>
      <AddButton addHouse={addHouse} />
    </>
  );
};

export default HouseList;
