import { NavLink } from "react-router-dom";

interface Props {
  category: string;
  name: string;
}

const Breadcrumb: React.FC<Props> = ({ category, name }) => {
  return (
    <ul className="flex gap-2 items-center py-4">
      <li>
        <NavLink to={"/"} className="text-sm">
          Home /{" "}
        </NavLink>
      </li>
      <li>
        <NavLink to={"/products"} className="text-sm">
          Products /{" "}
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/products?category=${encodeURIComponent(category)}`}
          className="text-sm"
        >
          {category} /{" "}
        </NavLink>
      </li>
      <li>
        <p className="text-sm">{name}</p>
      </li>
    </ul>
  );
};

export default Breadcrumb;
