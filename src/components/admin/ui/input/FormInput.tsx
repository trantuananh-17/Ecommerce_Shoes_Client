import type React from "react";

interface Props {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

const FormInput: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input
        className="border border-gray-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default FormInput;
