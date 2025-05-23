import { createContext } from "react";
import navValues from "./navValues";
import type { houseModel } from "../components/HouseList";

const navigationContext = createContext<{
  current: string;
  param: houseModel | null;
  navigate: (navTo: string, param: houseModel | null) => void;
}>({
  current: navValues.home,
  param: null,
  navigate: () => {},
});

export default navigationContext;
