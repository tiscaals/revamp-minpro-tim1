import { useState } from "react";

const Checkbox = (props:any) => {
    const {namaCheck} = props

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-4 w-4 text-blue-500 transition duration-150 ease-in-out"

        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span className="ml-2 text-gray-700">{namaCheck}</span>
    </label>
  );
};

export default Checkbox;