import { useState } from "react";

const ToggleSwitch = (props:any) => {
  const {register }= props;
  const [isChecked, setIsChecked] = useState(true);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="relative inline-flex items-center mb-4 cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        {...register}
        checked={isChecked}
        onChange={handleToggle}
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  );
};

export default ToggleSwitch;
