import { useEffect, useOptimistic, useState } from "react";
import loadingStatus from "../helpers/loadingStatus";
import type { bidModel } from "../components/Bids";

const useBids = (houseId: number) => {
  const [bids, setBids] = useState<bidModel[]>([]);
  const [loadingState, setLoadingState] = useState(loadingStatus.isLoading);
  const [optimisticBids, addOptimisticBid] = useOptimistic<bidModel[]>(bids);

  // Use the updater function for addOptimisticBid to ensure correct state updates
  // The updater receives the current state and returns the new state
  const optimisticAdd = (bid: bidModel) => addOptimisticBid((currentBids) => [...currentBids, bid]);
  
  // useEffect itself cannot be async. If you try to make the effect function
  // async, it returns a Promise, which React does not expect.
  // By defining an inner fetchBids async function, we can use await for
  // asynchronous operations (like fetch), and then call this function
  // synchronously inside useEffect.
  useEffect(() => {
    const fetchBids = async () => {
      setLoadingState(loadingStatus.isLoading);
      try {
        const response = await fetch(`https://localhost:4000/bid/${houseId}`);
        const bids = await response.json();
        setBids(bids);
        setLoadingState(loadingStatus.loaded);
      } catch {
        setLoadingState(loadingStatus.hasErrored);
      }
    };
    fetchBids();
  }, [houseId]);

  const postBid = async (bid: bidModel) => {
    const rsp = await fetch("https://localhost:4000/bid", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bid),
    });
    return await rsp.json();
  };

  const addBid = async (bid: bidModel) => {
    optimisticAdd(bid);
    const postedBid = await postBid(bid);
    setBids([...bids, postedBid]);
  };

  return { bids: optimisticBids, loadingState, addBid };
};

export default useBids;
