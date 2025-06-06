import type { bidModel } from "./BidList";
import type { houseModel } from "./HouseList";

const AddBid = ({
  house,
  addBid,
}: {
  house: houseModel;
  addBid: (bid: bidModel) => Promise<void>;
}) => {
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
  );
};

export default AddBid;
