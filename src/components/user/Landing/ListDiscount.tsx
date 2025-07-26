import DiscountItem from "../Shared/ui/DiscountItem";

const ListDiscount = () => {
  return (
    <ul className="mt-8 md:grid grid-cols-4 gap-7 ">
      <DiscountItem />
      <DiscountItem />
      <DiscountItem />
      <DiscountItem />
    </ul>
  );
};

export default ListDiscount;
