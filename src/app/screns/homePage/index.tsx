import { Container } from "@mui/material";
import Statistics from "./Statistics";
import PopularProducts from "./PopularProducts";
import NewProducts from "./NewProduts";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";
import { useEffect } from "react";

export default function HomePage() {
  // Selector: will store the data

  useEffect(() => {
    // 1st ComponentDidMount
    // Backend server data request = > DATA
    // Slice: Data will be written to the Redux Store
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularProducts />
      <NewProducts />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
