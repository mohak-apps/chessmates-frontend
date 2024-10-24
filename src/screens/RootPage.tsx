import { Outlet } from "react-router-dom";
import noiseTexture from "../assets/noise.png";
import Header from "./Header";
import Footer from "./Footer";

const RootPage = () => {
  // const style = {
  //   backgroundImage: `url(${noiseTexture})`,
  // };
  return (
    <div className=" bg-primaryBackground flex flex-col h-screen bw-full justify-between">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootPage;
