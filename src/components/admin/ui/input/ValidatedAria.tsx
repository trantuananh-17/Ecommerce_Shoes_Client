import { forwardRef, type ChangeEvent } from "react";

interface ValidatedAriaProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  name?: string;
  row: number;
}

const ValidatedAria = forwardRef<HTMLTextAreaElement, ValidatedAriaProps>(
  ({ placeholder, value, onChange, error, name, row }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const val = e.target.value;
      onChange(val);
    };

    return (
      <div className="w-full">
        <textarea
          ref={ref}
          id={name}
          name={name}
          rows={row}
          className={`relative block w-full p-2.5 text-sm rounded-lg border ${
            error
              ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700  focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
              : value.length > 0
              ? "bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 "
              : "border-gray-300 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
          }`}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          aria-invalid={!!error}
          aria-describedby={`${name}-error`}
        />

        {error && (
          <div id={`${name}-error`} className="absolute mt-2 z-10" role="alert">
            <div className="absolute left-0 top-full z-10 w-max max-w-xs bg-white text-sm text-black shadow-md border border-gray-300 px-3 py-2 rounded-md">
              <div className="flex items-start gap-2">
                <div className="text-orange-500 font-bold">!</div>
                <div>{error}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default ValidatedAria;
