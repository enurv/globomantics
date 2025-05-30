import currencyFormatter from "../helpers/currencyFormatter";
import loadingStatus from "../helpers/loadingStatus";
import useBids from "../hooks/useBids";
import type { houseModel } from "./HouseList";
import LoadingIndicator from "./LoadingIndicator";

export interface bidModel {
  id?: number;
  houseId: number;
  bidder: string;
  amount: number;
}

const Bids = ({ house }: { house: houseModel }) => {
  const { bids, loadingState, addBid } = useBids(house.id);

  if (loadingState !== loadingStatus.loaded)
    return <LoadingIndicator loadingState={loadingState} />;

  // FormData is an object native to JS that contains key/value pairs
  // representing all the values submitted in the form.
  const bidSubmitAction = async (formData: FormData) => {
    // addBid changes state on the custom hook after sending request
    // you can get the form data from the FormData object using input's name attributes
    await addBid({
      houseId: house.id,
      bidder: formData.get("bidder") as string,
      amount: parseFloat(formData.get("amount") as string),
    });
  };

  return (
    <>
      <div className="row mt-4">
        <div className="col-12">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Bidder</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((b: bidModel) => (
                <tr key={b.id}>
                  <td>{b.bidder}</td>
                  <td>{currencyFormatter.format(b.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <form action={bidSubmitAction} className="row row-cols-lg-auto">
        <div className="col-5">
          <input
            id="bidder"
            className="h-100 form-control"
            type="text"
            name="bidder"
            placeholder="Bidder"
          ></input>
        </div>
        <div className="col-5">
          <input
            id="amount"
            className="h-100 form-control"
            type="number"
            name="amount"
            placeholder="Amount"
          ></input>
        </div>
        <div className="col-2">
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default Bids;
