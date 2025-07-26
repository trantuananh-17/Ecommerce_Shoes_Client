import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInFast } from "../../../../motion/variants";

interface Props {
  title: string;
  subtitle?: string;
  link: string;
  hidden?: boolean;
}

const Heading: React.FC<Props> = ({ title, subtitle, link, hidden }) => {
  return (
    <div className="md:flex justify-between items-end" data-aos="fade-in">
      <motion.div
        variants={fadeInFast("right", 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-3xl font-bold">{title}</h2>
        {subtitle && <p className="mt-2 text-lightGray">{subtitle}</p>}
      </motion.div>
      {hidden && (
        <motion.div
          variants={fadeInFast("left", 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <NavLink
            to={link}
            className="mt-6 md:mt-0 h-9 border border-black px-7 inline-flex items-center font-semibold text-black rounded-full text-[15px] hover:bg-black hover:text-white transition-all duration-300"
          >
            View All
          </NavLink>
        </motion.div>
      )}
    </div>
  );
};

export default Heading;
