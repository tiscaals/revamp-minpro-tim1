import React from "react";
import Link from "next/link";

const Content1 = (props: any) => {
  const { title, path, children ,button } = props;
  return (
    <div className="container">
      <div className="w-full flex mt-10 px-4 bg-white  justify-between items-center border-b shadow-sm">
        <div className="flex ">
          <h1 className="text-2lg font-bold leading-6 text-gray-900 sm:truncate uppercase">
            {title}
          </h1>
        </div>
        <div className="flex pb-1">
          <Link
            href={`${path}`}
            type="buton"
            className="text-white order-0 inline-flex items-center px-4 py-2  border rounded-md bg-blue-400 text-sm font-medium focus:ring-blue-500 sm:order-1 uppercase hover:bg-blue-500"
           
           >
            {button}
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Content1;
