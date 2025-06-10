import { NavLink } from "react-router-dom";

interface Props {
  text: string;
  link: string;
}

const NavLinkItem: React.FC<Props> = ({ text, link }) => {
  return (
    <li>
      <NavLink to={link} className="hover:underline">
        {text}
      </NavLink>
    </li>
  );
};

export default NavLinkItem;
