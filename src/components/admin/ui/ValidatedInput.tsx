import {
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
  type ChangeEvent,
} from "react";
import type { Schema } from "joi";

export interface ValidatedInputRef {
  validate: () => boolean;
}

interface ValidatedInputProps {
  placeholder?: string;
  schema: Schema;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  onErrorChange?: (error: string | null) => void;
}

const ValidatedInput = forwardRef<ValidatedInputRef, ValidatedInputProps>(
  (
    {
      placeholder,
      schema,
      value: controlledValue,
      onChange,
      name,
      onErrorChange,
    },
    ref
  ) => {
    const [value, setValue] = useState(controlledValue || "");
    const [error, setError] = useState<string | null>(null);

    const validateValue = useCallback(
      (val: string): boolean => {
        const result = schema.validate(val);
        if (result.error) {
          const message = result.error.details[0].message;
          setError(message);
          onErrorChange?.(message);
          return false;
        } else {
          setError(null);
          onErrorChange?.(null);
          return true;
        }
      },
      [schema, onErrorChange]
    );

    useImperativeHandle(ref, () => ({
      validate: () => validateValue(value),
    }));

    useEffect(() => {
      if (controlledValue !== undefined && controlledValue !== value) {
        setValue(controlledValue);
        validateValue(controlledValue);
      }
    }, [value, controlledValue, validateValue]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (controlledValue === undefined) {
        setValue(val);
      }
      onChange?.(val);
    };

    return (
      <div>
        <input
          id={name}
          name={name}
          type="text"
          className={`relative block w-full p-2.5 text-sm rounded-lg border ${
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

        {error && (
          <div className="absolute mt-2 z-10 ">
            <div className="absolute left-0  top-full  z-10 w-max max-w-xs bg-white text-sm text-black shadow-md border border-gray-300 px-3 py-2 rounded-md">
              <div className="flex items-start gap-2">
                <div className="text-orange-500 font-bold">!</div>
                <div>{error}</div>
              </div>
              <div className="absolute z-9 -top-1 left-3 w-2 h-2 bg-white border-l border-t border-gray-300 transform rotate-45"></div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default ValidatedInput;
