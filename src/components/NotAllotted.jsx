import React from "react";

const NotAllotted = () => {
  return (
    <div className="flex justify-center items-center h-[80vh]"> 
      <div className="w-full max-w-2xl p-6 text-center bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Not allotted to any batch currently!
        </h5>
        <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
          You'll be able to access information on all the batches you're allotted to over here.
        </p>
      </div>
    </div>
  );
};

export default NotAllotted;
