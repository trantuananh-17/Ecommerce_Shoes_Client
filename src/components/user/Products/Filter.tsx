import { ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { listDrawer, subMenuDrawer } from "../../../motion/variants";

interface SubMenuItem {
  name: string;
}

interface MenuItem {
  name: string;
  subMenu?: SubMenuItem[];
}

interface Props {
  menus: MenuItem[];
}

const Filter: React.FC<Props> = ({ menus }) => {
  const [opened, setOpened] = useState<boolean[]>(
    new Array(menus.length).fill(false)
  );
  const [selected, setSelected] = useState<{ [key: string]: string | null }>(
    {}
  );
  const [openMenus, setOpenMenus] = useState<boolean>(false);

  const handleCheckboxChange = (menuName: string, subMenuName: string) => {
    setSelected((prevSelected) => {
      if (prevSelected[menuName] === subMenuName) {
        return { ...prevSelected, [menuName]: null };
      }
      return { ...prevSelected, [menuName]: subMenuName };
    });
  };

  const handleItemClick = (menuName: string, subMenuName: string) => {
    handleCheckboxChange(menuName, subMenuName);
  };

  return (
    <div className="flex flex-col gap-4 ">
      <div
        className="flex gap-2 items-center cursor-pointer bg-gray-100 p-3 rounded-xl"
        onClick={() => setOpenMenus(!openMenus)}
      >
        <Menu />
        <h2 className="font-bold text-xl">Filter Products</h2>
      </div>

      <AnimatePresence>
        {openMenus && (
          <motion.ul
            initial="exit"
            animate="enter"
            exit="exit"
            variants={listDrawer}
            className="flex flex-col"
          >
            {menus.map(({ name, subMenu }, i) => {
              const isClicked = opened[i];
              const hasSubMenu = subMenu?.length;
              return (
                <li key={name}>
                  <span
                    className="flex p-4 gap-6 justify-between hover:bg-gray-100 rounded-md cursor-pointer relative"
                    onClick={() => {
                      const newOpenedState = [...opened];
                      newOpenedState[i] = !newOpenedState[i];
                      setOpened(newOpenedState);
                    }}
                  >
                    <span>{name}</span>
                    <span>
                      {hasSubMenu && (
                        <ChevronDown
                          className={`ml-auto transition-transform ${
                            isClicked ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </span>
                  </span>
                  {hasSubMenu && (
                    <motion.ul
                      initial="exit"
                      animate={isClicked ? "enter" : "exit"}
                      variants={subMenuDrawer}
                      className="ml-5"
                    >
                      {subMenu.map(({ name: subMenuName }) => (
                        <li
                          key={subMenuName}
                          className="p-2 flex hover:bg-white/5 rounded-md gap-x-2 cursor-pointer"
                          onClick={() => handleItemClick(name, subMenuName)}
                        >
                          <input
                            type="checkbox"
                            name={name}
                            value={subMenuName}
                            checked={selected[name] === subMenuName}
                            onChange={() =>
                              handleCheckboxChange(name, subMenuName)
                            }
                          />
                          {subMenuName}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Filter;
