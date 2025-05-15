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

export default HouseRow;
