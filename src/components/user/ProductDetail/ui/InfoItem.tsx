interface Props {
  title: string;
  name: string;
}

const InfoItem: React.FC<Props> = ({ name, title }) => {
  return (
    <div className="my-5 ">
      <p className="">{title}:</p>
      <span className="inline-block px-3 py-2 mt-1 border border-gray-300 bg-gray-50 text-sm text-gray-500 rounded-md">
        {name}
      </span>
    </div>
  );
};

export default InfoItem;
