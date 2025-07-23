interface Props {
  title: string;
  content: string;
}

const OrderDetailItem: React.FC<Props> = ({ title, content }) => {
  return (
    <div className="flex justify-between gap-8 ">
      <strong className="text-sm text-gray-600 whitespace-nowrap">
        {title}
      </strong>
      <p className="text-sm text-gray-500 text-right whitespace-nowrap">
        {content}{" "}
      </p>
    </div>
  );
};

export default OrderDetailItem;
