import { useState } from "react";
import { CheckIcon } from "@heroicons/react/outline";

function Checkbox({ suggestion }) {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked((prevState) => !prevState);
  };

  return (
    <div className="flex items-center mb-2">
      <div
        className={`h-5 w-5 rounded-full border-2 flex justify-center items-center cursor-pointer ${
          isChecked ? "border-blue-500 bg-blue-200" : "border-gray-300"
        }`}
        onClick={toggleCheckbox}
      >
        {isChecked && <CheckIcon className="h-3 w-3 text-blue-500" />}
      </div>
      <p className="ml-2 text-sm text-gray-700">{suggestion}</p>
    </div>
  );
}

export default Checkbox;
