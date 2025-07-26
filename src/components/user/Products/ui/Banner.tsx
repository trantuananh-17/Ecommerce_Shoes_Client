import banner from "../../../../assets/images/product_banner.jpg";

const Banner = () => {
  return (
    <section className="w-full h-[35vh] overflow-hidden relative">
      <img
        src={banner}
        alt="Banner product"
        className="w-full h-full object-cover "
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col ">
        <h2 className="text-4xl font-semibold text-center">Products</h2>
        <p className="text-center">Home / Products</p>
      </div>
    </section>
  );
};

export default Banner;
