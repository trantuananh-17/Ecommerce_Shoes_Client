import { forwardRef, type ChangeEvent } from "react";

interface ValidatedInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  name?: string;
}

const ValidatedInput = forwardRef<HTMLInputElement, ValidatedInputProps>(
  ({ placeholder, value, onChange, error, name }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      onChange(val);
    };

    return (
      <div className="w-full">
        <input
          ref={ref}
          id={name}
          name={name}
          type="text"
          className={`relative block max-w-[100%] w-full p-2.5 text-sm rounded-lg border ${
            error
              ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
              : value.length > 0
              ? "bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 "
              : "border-gray-300 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
          }`}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />

        {error && (
          <div className="absolute mt-2 z-10">
            <div className="absolute left-0 top-full z-10 w-max max-w-xs bg-white text-sm text-black shadow-md border border-gray-300 px-3 py-2 rounded-md">
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
