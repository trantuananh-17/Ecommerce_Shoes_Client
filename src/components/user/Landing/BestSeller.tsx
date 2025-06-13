import ListProduct from "./ListProduct";
import Heading from "./ui/Heading";

const BestSeller = () => {
  return (
    <section className=" pt-16 pb-16 bg-gray-50">
      <div className="container">
        <Heading
          title="Bestseller"
          subtitle="Experience the best products at our store!"
          link="/"
          hidden
        />
        <ListProduct />
      </div>
    </section>
  );
};

export default BestSeller;
