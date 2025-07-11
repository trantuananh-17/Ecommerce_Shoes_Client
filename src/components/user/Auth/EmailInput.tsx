import React, { useState, useEffect } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const EmailInput: React.FC<Props> = ({ value, onChange }) => {
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email) {
      setError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return false;
    }
    setError(null);
    return true;
  };

  const handleBlur = () => {
    validateEmail(value);
  };

  useEffect(() => {
    if (value) {
      validateEmail(value);
    }
  }, [value]);

  return (
    <div>
      <div>
        <input
          id="email"
          type="email"
          className="w-full h-[50px] border border-gray-300 p-4 rounded-lg text-sm"
          placeholder="Email*"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
        />
        {error ? (
          <span className="text-xs text-red-600 mt-1 block">{error}</span>
        ) : (
          <span className="text-xs text-white mt-1 block">Hợp lệ</span>
        )}
      </div>
    </div>
  );
};

export default EmailInput;
