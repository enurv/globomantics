import { useState } from "react";
import HouseRow from "./HouseRow";

const houseArray = [
  {
    id: 1,
    address: "12 Valley of Kings, Geneva",
    country: "Switzerland",
    price: 900000,
  },
  {
    id: 2,
    address: "Enver'e cok asigimmmmm",
    country: "Switzerland",
    price: 500000,
  },
];

const HouseList = () => {
  //houses state is readonly use setHouses to change the state
  const [houses, setHouses] = useState(houseArray);

  //const [counter, setCounter] = useState(0);
  //! setCounter can take a function parameter that gets the current state
  //! if there is multiple call to setter react can batch those calls for efficiency only updating the state when batch completes
  //! this approach ensures that current is set by the previous call hence this approach is reccomended
  //setCounter((current) => current + 1);

  const addHouse = () => {
    //set functions have to change the reference so it needs to create new array
    setHouses([
      ...houses,
      {
        id: 6,
        address: "32 Valley Way, New york",
        country: "USA",
        price: 1000000,
      },
    ]);
  };

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
          {houses.map((h, index) => (
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
      <button className="btn btn-primary" onClick={addHouse}>
        Add
      </button>
    </>
  );
};

export default HouseList;
