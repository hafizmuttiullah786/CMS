import ForgetPassword from "@/components/ForgetPassword";
import Signin from "@/components/Signin";
import React from "react";

const page = () => {
  return (
    <>
      <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
          Forget Password
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div>

      <div>
        <ForgetPassword />
      </div>
      <div className="mt-6 text-center"></div>
    </>
  );
};

export default page;
