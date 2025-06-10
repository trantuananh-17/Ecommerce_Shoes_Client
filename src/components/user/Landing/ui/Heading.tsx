import { NavLink } from "react-router-dom";

interface Props {
  title: string;
  subtitle?: string;
  link: string;
  hidden?: boolean;
}

const Heading: React.FC<Props> = ({ title, subtitle, link, hidden }) => {
  return (
    <div className="lg:flex justify-between items-end">
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        {subtitle && <p className="mt-2 text-lightGray">{subtitle}</p>}
      </div>
      {hidden && (
        <NavLink
          to={link}
          className="mt-6 lg:mt-0 h-9 border border-black px-7 inline-flex items-center font-semibold text-black rounded-full text-[15px] hover:bg-black hover:text-white transition-all duration-300"
        >
          View All
        </NavLink>
      )}
    </div>
  );
};

export default Heading;
