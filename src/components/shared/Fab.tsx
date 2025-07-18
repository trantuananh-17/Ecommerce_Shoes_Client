import { Languages } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import i18n from "i18next";

const Fab: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fabRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (fabRef.current && !fabRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const changeLanguage = (lng: "en" | "vi") => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
    window.location.reload();
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as
      | "en"
      | "vi"
      | null;
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      i18n.changeLanguage("en");
    }
  }, []);

  return (
    <div
      ref={fabRef}
      className="group fixed bottom-0 right-0 p-2 flex items-end justify-end w-24 h-24"
    >
      <div
        className="text-white shadow-xl flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 z-50 absolute"
        onClick={toggleMenu}
      >
        <Languages />
      </div>

      <div
        className={`absolute rounded-full transition-all duration-[0.2s] ease-out ${
          isOpen ? "scale-y-100" : "scale-y-0"
        } ${
          isOpen ? "-translate-x-16" : ""
        } flex p-2 hover:p-3 bg-green-300 scale-100 hover:bg-green-400 text-white`}
        onClick={() => changeLanguage("vi")}
      >
        <div className="font-bold">VN</div>
      </div>

      <button
        className={`absolute rounded-full transition-all duration-[0.2s] ease-out ${
          isOpen ? "scale-x-100" : "scale-x-0"
        } ${
          isOpen ? "-translate-y-14 -translate-x-14" : ""
        } flex p-2 hover:p-3 bg-yellow-300 hover:bg-yellow-400 text-white`}
        onClick={() => changeLanguage("en")}
      >
        <div className="font-bold">EN</div>
      </button>
    </div>
  );
};

export default Fab;
