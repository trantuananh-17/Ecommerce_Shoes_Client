import Benefit from "./ui/Benefit";
import ico_freeship from "../../../assets/images/ico_freeship.svg";
import ico_quality from "../../../assets/images/ico_quality.svg";
import ico_return from "../../../assets/images/ico_return.svg";
import ico_support from "../../../assets/images/ico_support.svg";

const Benefits = () => {
  return (
    <section className="bg-gray-100">
      <div className="container">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-5 items-center py-14">
          <Benefit icon={ico_freeship} text="Free Shipping Over $50" />
          <Benefit icon={ico_quality} text="Quality Assurance" />
          <Benefit icon={ico_return} text="Return within 14 days" />
          <Benefit icon={ico_support} text="Support 24/7" />
        </ul>
      </div>
    </section>
  );
};

export default Benefits;
