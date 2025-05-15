import HouseRow from "./HouseRow";

const houses = [
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
            <HouseRow address={h.address} country={h.country} price={h.price} key={h.id} />
            // <HouseRow {...h} key={h.id} />  object destructing alternative but could cause performance issues

          ))}
        </tbody>
      </table>
    </>
  );
};

export default HouseList;
