import ListDiscount from "./ListDiscount";
import Heading from "./ui/Heading";

const DiscountCode = () => {
  return (
    <section className=" pt-16 pb-16 bg-white">
      <div className="container">
        <Heading title="Promotional program" link="/" />
        <ListDiscount />
      </div>
    </section>
  );
};

export default DiscountCode;
