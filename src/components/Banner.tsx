import { useContext, type ReactNode } from "react";
import logo from "../assets/GloboLogo.png";
import styles from "./Banner.module.css";
import navValues from "../navigation/navValues";
import navigationContext from "../navigation/navigationContext";
import { useNavigate } from "react-router";
//! important to remember to not put this into component function since it gets called everytime it is re-rendered
//! since this is a private member of the module this css is isolated
//! but this approach is not encouraged
const subtitleStyle = {
  fontStyle: "italic",
  fontSize: "x-large",
  color: "coral",
};

const Banner = ({ children }: { children: ReactNode }) => {
  //! props must be readonly

  const navigate = useNavigate();
  
  return (
    <header className="row mb-4">
      <div className="col-5">
        <img
          src={logo}
          className={styles.logo}
          alt="logo"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="col-7 mt-5" style={subtitleStyle}>
        {children}
      </div>
    </header>
  );
};
export default Banner;
