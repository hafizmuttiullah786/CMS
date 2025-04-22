import React from "react";
import Link from "next/link";
import SignUp from "@/components/SignUp";

const SignIn: React.FC = () => {
  return (
    <>
      <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
          sign up
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div>

      <div>
        <SignUp />
      </div>

      <div className="mt-6 text-center">
        <p>
          have any account?{" "}
          <Link href="/auth/signin" className="text-primary">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignIn;
