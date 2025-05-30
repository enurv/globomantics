import { useState } from "react";
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

const Bids = ({ house }: {house: houseModel}) => {
  const { bids, loadingState, addBid } = useBids(house.id);
  const emptyBid = {
    houseId: house.id,
    bidder: "",
    amount: 0,
  };

  const [newBid, setNewBid] = useState<bidModel>(emptyBid);

  if (loadingState !== loadingStatus.loaded)
    return <LoadingIndicator loadingState={loadingState} />;

  const onBidSubmitClick = () => { 
    addBid(newBid);
    setNewBid(emptyBid);
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
      <div className="row">
        <div className="col-5">
          <input
            id="bidder"
            className="h-100 form-control"
            type="text"
            value={newBid.bidder}
            onChange={(e) => setNewBid({
              ...newBid,
              bidder: e.target.value
            })}
            placeholder="Bidder"
          ></input>
        </div>
        <div className="col-5">
          <input
            id="amount"
            className="h-100 form-control"
            type="number"
            value={newBid.amount}
            onChange={(e) =>
              setNewBid({
                ...newBid,
                amount: parseInt(e.target.value)
              })
            }
            placeholder="Amount"
          ></input>
        </div>
        <div className="col-2">
          <button className="btn btn-primary"
            onClick={onBidSubmitClick}>
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default Bids;
