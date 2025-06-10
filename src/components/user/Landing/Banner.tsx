import { NavLink } from "react-router-dom";
import banner from "../../../assets/images/banner.jpg";

const Banner = () => {
  return (
    <section className="relative pt-[41.667%] w-full overflow-hidden">
      <img
        className="animate-zoomIn image absolute inset-0 max-h-[860px]"
        src={banner}
        alt=""
      />

      <div className="absolute w-full top-8/10 left-1/2 -translate-x-1/2 -translate-y-8/10 text-center">
        <h2 className="text-xl lg:text-4xl font-bold text-gray-500 lg:leading-10 animate-slideInLeft">
          {/* Vững Chắc Mỗi Bước Chân <br />
          Sự Lựa Chọn Hoàn Hảo Cho Bạn */}
          Confidence in Every Step <br />
          The Perfect Choice for You
        </h2>
        {/* Confidence in Every Step – The Perfect Choice for You */}
        <NavLink
          style={{ animationDelay: "0.3s" }}
          to="/"
          className="animate-slideInLeft mt-4 lg:mt-8 h-9 border border-gray-500 px-7 inline-flex items-center font-semibold text-black rounded-full text-[15px] hover:bg-gray-400 hover:text-white transition-all duration-300"
        >
          Shop now
        </NavLink>
      </div>
    </section>
  );
};

export default Banner;
