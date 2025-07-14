import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Layers2,
  LayoutGrid,
  Package,
  Palette,
  Ruler,
} from "lucide-react";

interface Props {
  toggleSize: () => void;
  toggleColor: () => void;
  toggleCategory: () => void;
  toggleClosure: () => void;
  toggleMaterial: () => void;
}

const DropDownButtonOther: React.FC<Props> = ({
  toggleSize,
  toggleColor,
  toggleCategory,
  toggleClosure,
  toggleMaterial,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleToggleDropdown = () => setIsOpen(!isOpen);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleCloseDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        onClick={handleToggleDropdown}
        className="focus:outline-none flex gap-1 items-center text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3  h-full"
        type="button"
      >
        <span>Thuộc tính</span> <ChevronDown size={20} />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow "
        >
          <ul className="py-2 text-sm text-gray-700 ">
            <li>
              <button
                onClick={() => {
                  toggleSize();
                  handleCloseDropdown();
                }}
                className="flex items-center w-full px-4 py-4 hover:bg-gray-100 "
              >
                <Ruler className="w-4 h-4 mr-2" />
                Kích cỡ
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  toggleColor();
                  handleCloseDropdown();
                }}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100 "
              >
                <Palette className="w-4 h-4 mr-2" />
                Màu sắc
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  toggleCategory();
                  handleCloseDropdown();
                }}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100 "
              >
                <LayoutGrid className="w-4 h-4 mr-2" />
                Danh mục
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  toggleClosure();
                  handleCloseDropdown();
                }}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100 "
              >
                <Layers2 className="w-4 h-4 mr-2" />
                Loại dây
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  toggleMaterial();
                  handleCloseDropdown();
                }}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100 "
              >
                <Package className="w-4 h-4 mr-2" />
                Chất liệu
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDownButtonOther;
