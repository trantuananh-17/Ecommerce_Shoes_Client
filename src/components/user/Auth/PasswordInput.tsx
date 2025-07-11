import React, { useEffect, useState } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const PasswordInput: React.FC<Props> = ({ value, onChange }) => {
  const [error, setError] = useState<string | null>(null);

  const validatePassword = (password: string): boolean => {
    // const passwordRegex =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordRegex = /^.{6,}$/;
    if (!password) {
      setError("Password is required");
      return false;
    } else if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long, and include an uppercase letter, a lowercase letter, and a number"
      );
      return false;
    }
    setError(null);
    return true;
  };

  const handleBlur = () => {
    validatePassword(value);
  };

  useEffect(() => {
    if (value) {
      validatePassword(value);
    }
  }, [value]);

  return (
    <div>
      <div>
        <input
          id="password"
          type="password"
          className="w-full h-[50px] border border-gray-300 p-4 rounded-lg text-sm"
          placeholder="Password*"
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

export default PasswordInput;
