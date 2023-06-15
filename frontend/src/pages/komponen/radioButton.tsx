import React from "react";

const RadioButton = (props:any) => {
    const {text}=props
  return (
    <div className="flex items-center mb-3">
      <input
        id="default-radio-1"
        type="radio"
        value=""
        name="default-radio"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        className="ml-2 text-gray-700"
      >
        {text}
      </label>
    </div>
  );
};

export default RadioButton;
