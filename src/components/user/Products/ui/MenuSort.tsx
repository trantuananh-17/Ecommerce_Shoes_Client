import { AnimatePresence, motion } from "framer-motion";
import { subMenuDrawer } from "../../../../motion/variants";

interface Props {
  open: boolean;
}

const MenuSort: React.FC<Props> = ({ open }) => {
  const sortOptions = [
    "Mặc định",
    "Sắp xếp giảm giá tăng dần",
    "Sắp xếp giảm giá giảm dần",
    "Sắp xếp giá tăng dần",
    "Sắp xếp giá giảm dần",
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.ul
          initial="exit"
          animate="enter"
          exit="exit"
          variants={subMenuDrawer}
          className="flex flex-col bg-gray-100 mt-3"
        >
          {sortOptions.map((option) => (
            <li
              key={option}
              className={` flex items-center py-3 cursor-pointer hover:bg-gray-200 rounded-md `}
            >
              {option}
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default MenuSort;
