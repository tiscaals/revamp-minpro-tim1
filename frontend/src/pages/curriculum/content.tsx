import React from "react";
// import { Link } from "react-router-dom";

const Content = (props:any) => {
  const {title, children, ...others} = props;
  return (
    <>
      <div className="grid col-1 relative bg-white shadow-sm border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-2lg font-bold leading-6 test-gray-900 sm:truncate uppercase">
            {title}
          </h1>
        </div>
        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <button
            onClick={() => others.fungsi()}
            type="button"
            className="order-0 inline-flex items-center px-4 py-2
            border border-transparent rounded-md bg-purple-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-purple-500 sm:order-1"
          >
            Create
          </button>
          
          {/* <Link to="/addUser" type="button" className="order-0 inline-flex items-center px-4 py-2
            border border-transparent rounded-md bg-purple-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-purple-500 sm:order-1">Create</Link> */}
        </div>
      </div>
      <div className="mt-8 sm:block relative">
        <div className="align-middle inline-block min-w-full border-b border-gray-200">
          {children}
        </div>
      </div>
    </>
  );
};

export default Content;
