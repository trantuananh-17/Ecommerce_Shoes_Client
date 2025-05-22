import { useEffect, useState } from "react";
import { CircleX, X } from "lucide-react";

type Props = {
  message: string;
  duration?: number;
};

const ToastError: React.FC<Props> = ({ message, duration = 2000 }) => {
  const [show, setShow] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const showTimeout = setTimeout(() => setShow(true), 50);
    const hideTimeout = setTimeout(() => setShow(false), duration);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, [duration]);

  useEffect(() => {
    if (!show) {
      const timer = setTimeout(() => setHidden(true), 500);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (hidden) return null;

  return (
    <div className="fixed top-16 right-6 z-50">
      <div
        className={`relative flex items-center gap-3 px-4 py-3 pr-10 rounded-2xl bg-red-500 text-white shadow-lg transition-all duration-500 transform
          ${show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        `}
        style={{ width: "320px" }}
      >
        <CircleX className="w-5 h-5 " />
        <span className="text-sm font-medium">{message}</span>

        <button
          onClick={() => setShow(false)}
          className="absolute cursor-pointer p-2 top-1/2 right-2 -translate-y-1/2 text-white hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ToastError;
