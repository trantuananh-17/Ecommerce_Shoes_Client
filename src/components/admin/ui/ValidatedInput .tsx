import React, {
  useState,
  useEffect,
  useCallback,
  type ChangeEvent,
} from "react";
import type { Schema } from "joi";

interface ValidatedInputProps {
  label: string;
  placeholder?: string;
  schema: Schema;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  onErrorChange?: (error: string | null) => void; // thêm prop này
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({
  label,
  placeholder,
  schema,
  value: controlledValue,
  onChange,
  name,
  onErrorChange,
}) => {
  const [value, setValue] = useState(controlledValue || "");
  const [error, setError] = useState<string | null>(null);

  const validateValue = useCallback(
    (val: string) => {
      const result = schema.validate(val);
      if (result.error) {
        setError(result.error.details[0].message);
        if (onErrorChange) onErrorChange(result.error.details[0].message);
      } else {
        setError(null);
        if (onErrorChange) onErrorChange(null);
      }
    },
    [schema, onErrorChange]
  );

  // Sync local state with controlled value
  useEffect(() => {
    if (controlledValue !== undefined && controlledValue !== value) {
      setValue(controlledValue);
      validateValue(controlledValue);
    }
  }, [controlledValue, validateValue, value]);

  useEffect(() => {
    if (controlledValue === undefined) {
      validateValue(value);
    }
  }, [value, controlledValue, validateValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (controlledValue === undefined) {
      setValue(val);
    }
    if (onChange) onChange(val);
  };

  return (
    <div>
      <label
        htmlFor={name}
        className={`block mb-2 text-sm font-medium ${
          error
            ? "text-red-700 dark:text-red-500"
            : value.length > 0
            ? "text-green-700 dark:text-green-500"
            : ""
        }`}
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type="text"
        className={`block w-full p-2.5 text-sm rounded-lg border ${
          error
            ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
            : value.length > 0
            ? "bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 dark:text-green-400 dark:placeholder-green-500 dark:border-green-500"
            : "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
        }`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />

      <p
        className={`mt-2 text-sm ${
          error
            ? "text-red-600 dark:text-red-500"
            : value.length > 0
            ? "text-green-600 dark:text-green-500"
            : "text-green-600 dark:text-green-500"
        }`}
      >
        {error || (value.length > 0 ? "Hợp lệ" : "\u00A0")}
      </p>
    </div>
  );
};

export default ValidatedInput;
