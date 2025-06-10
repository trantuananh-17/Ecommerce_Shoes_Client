interface Props {
  icon: string;
  text: string;
}

const Benefit: React.FC<Props> = ({ icon, text }) => {
  return (
    <li className="flex items-center lg:justify-center lg:flex-1 gap-[15px]">
      <img src={icon} alt="icon" />
      <span className="text-sm lg:text-base font-semibold">{text}</span>
    </li>
  );
};

export default Benefit;
