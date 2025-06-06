import React from "react";
import { useNavigate } from "react-router-dom";

interface ButtonNavProps {
  to: string;
  label: string;
}

const ButtonNav: React.FC<ButtonNavProps> = ({ to, label }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {label}
    </button>
  );
};

export default ButtonNav;
