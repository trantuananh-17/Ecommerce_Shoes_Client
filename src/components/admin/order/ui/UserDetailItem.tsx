interface Props {
  title: string;
  content: string;
}

const UserDetailItem: React.FC<Props> = ({ title, content }) => {
  return (
    <div className=" ">
      <strong className="text-sm text-gray-600">{title}</strong>
      <p className="text-sm text-gray-500">{content}</p>
    </div>
  );
};

export default UserDetailItem;
