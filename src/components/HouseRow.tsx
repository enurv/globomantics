import React from "react";
import currencyFormatter from "../helpers/currencyFormatter";

const HouseRow = ({
  address,
  country,
  price,
}: {
  address: string;
  country: string;
  price: number;
}) => {
  return (
    <tr>
      <td>{address}</td>
      <td>{country}</td>
      <td>{currencyFormatter.format(price)}</td>
    </tr>
  );
};

// React.memo has overhad in terms of performance. 
// You should only use if the performance gain measurable and it is a pure component (only dependent on the props)
// memo only compares the shallow reference. For more info https://react.dev/reference/react/memo
const HouseRowMemo = React.memo(HouseRow);

export default HouseRow;
export { HouseRowMemo };
