import { useCallback, useEffect, useState } from "react";
import HouseRow from "./HouseRow";
import AddButton from "./AddButton";

interface house {
  id: number;
  address: string;
  country: string;
  price: number;
}

const HouseList = () => {
  //houses state is readonly use setHouses to change the state
  const [houses, setHouses] = useState<house[]>([]);

  useEffect(() => {
    const fetchHouses = async () => {
      const response = await fetch("https://localhost:4000/house");
      const houses = await response.json();
      setHouses(houses);
    };
    fetchHouses();
  }, []);

  //const [counter, setCounter] = useState(0);
  //! setCounter can take a function parameter that gets the current state
  //! if there is multiple call to setter react can batch those calls for efficiency only updating the state when batch completes
  //! this approach ensures that current is set by the previous call hence this approach is reccomended
  //setCounter((current) => current + 1);

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
            <HouseRow
              address={h.address}
              country={h.country}
              price={h.price}
              key={h.id}
            />
            // <HouseRow {...h} key={h.id} />  object destructing alternative but could cause performance issues
          ))}
        </tbody>
      </table>
      <AddButton addHouse={addHouse} />
    </>
  );
};

export default HouseList;
