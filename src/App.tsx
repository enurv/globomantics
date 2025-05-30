import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Banner from "./components/Banner";
import HouseList from "./components/HouseList";
import House from "./components/House";

function App() {
  return (
    <BrowserRouter>
      <Banner>
        <div>"Providing houses all over the world"</div>
      </Banner>
      <Routes>
        {/* index means the root of domain which is the home page */}
        <Route index element={<HouseList />} />
        <Route path="house/:id" element={<House />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
