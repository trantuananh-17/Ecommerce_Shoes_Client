import Banner from "../../components/user/Landing/Banner";
import Benefits from "../../components/user/Landing/Benefits";
import BestSeller from "../../components/user/Landing/BestSeller";
import DiscountCode from "../../components/user/Landing/DiscountCode";
import NewProduct from "../../components/user/Landing/NewProduct";

const LandingPage = () => {
  return (
    <div className="wrap">
      <Banner />
      <Benefits />
      <DiscountCode />
      <BestSeller />
      <NewProduct />
    </div>
  );
};

export default LandingPage;
