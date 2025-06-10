import ListProduct from "./ListProduct";
import Heading from "./ui/Heading";

const NewProduct = () => {
  return (
    <section className="pt-16 pb-16 bg-white">
      <div className="container">
        <Heading
          title="New Shoes"
          subtitle="Experience the best products at our store!"
          link="/"
          hidden
        />
        <ListProduct />
      </div>
    </section>
  );
};

export default NewProduct;
