interface Props {
  title: string;
  content?: string;
}

const DescriptionItem: React.FC<Props> = ({ title, content }) => {
  return (
    <p className="mt-3">
      <strong>{title}: </strong> {content}
    </p>
  );
};

export default DescriptionItem;
