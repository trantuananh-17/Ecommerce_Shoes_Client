import { CircleCheck } from "lucide-react";

const PickUpInfo = () => {
  return (
    <div className="mt-6 p-[15px] rounded-xl border border-[#dedede] flex items-start gap-3">
      <div>
        <CircleCheck color="green" />
      </div>
      <div className="text-sm">
        <p className="text-lightGray">
          Pickup available at{" "}
          <span className="font-semibold text-black">HaUI</span>
        </p>
        <p className="text-xs text-lightGray mt-1">Usually ready in 24 hours</p>
        <a
          href="https://maps.app.goo.gl/svSNvpY3HroS6kwy7"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-xs mt-4"
        >
          View store information
        </a>
      </div>
    </div>
  );
};

export default PickUpInfo;
