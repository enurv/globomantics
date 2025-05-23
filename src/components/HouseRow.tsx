import React from "react";
import currencyFormatter from "../helpers/currencyFormatter";
import type { houseModel } from "./HouseList";
import navigationContext from "../navigation/navigationContext";
import navValues from "../navigation/navValues";

const HouseRow = ({ house }: { house: houseModel }) => {
  const { navigate } = React.useContext(navigationContext);
  return (
    <tr onClick={() => navigate(navValues.house, house)}>
      <td>{house.address}</td>
      <td>{house.country}</td>
      {house.price && (
        <td className={house.price >= 500000 ? "text-primary" : ""}>
          {currencyFormatter.format(house.price)}
        </td>
      )}
    </tr>
  );
};

// React.memo has overhad in terms of performance.
// You should only use if the performance gain measurable and it is a pure component (only dependent on the props)
// memo only compares the shallow reference. For more info https://react.dev/reference/react/memo
const HouseRowMemo = React.memo(HouseRow);

export default HouseRow;
export { HouseRowMemo };
