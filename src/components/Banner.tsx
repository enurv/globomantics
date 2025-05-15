import type { ReactNode } from "react";
import logo from "../assets/GloboLogo.png";
import { logo as logoClass } from "./Banner.module.css";

//! important to remember to not put this into component function since it gets called everytime it is re-rendered
//! since this is a private member of the module this css is isolated
//! but this approach is not encouraged
const subtitleStyle = {
  fontStyle: "italic",
  fontSize: "x-large",
  color: "coral",
};

const Banner = ({ children }: {children: ReactNode}) => {
  //! props must be readonly
  return (
    <header className="row mb-4">
      <div className="col-5">
        <img src={logo} className={logoClass} alt="logo" />
      </div>
      <div className="col-7 mt-5" style={subtitleStyle}>
        {children}
      </div>
    </header>
  );
};
export default Banner;
