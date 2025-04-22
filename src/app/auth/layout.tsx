import React from "react";
import Image from "next/image";
import Logo from "../../../public/images/edu1-removebg-preview-2.png";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="h-full">
        <div
          className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card "
          style={{ minHeight: "100vh" }}
        >
          <div className="flex flex-wrap items-center">
            <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
              <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none">
                <Image
                  className="hidden dark:block"
                  src={Logo}
                  alt="Logo"
                  width={176}
                  height={32}
                />
                <Image
                  className="dark:hidden"
                  src={Logo}
                  alt="Logo"
                  width={176}
                  height={32}
                />
                <p className="mb-3 text-xl font-medium text-dark dark:text-white">
                  Sign in to your account
                </p>
                <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                  Welcome Back!
                </h1>
                <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                  Please sign in to your account by completing the necessary
                  fields
                </p>
                <div className="">
                  <Image
                    src={"/images/grids/grid-02.svg"}
                    alt="Logo"
                    width={405}
                    height={325}
                    className="mx-auto dark:opacity-30"
                  />
                </div>
              </div>
            </div>
            <div className="w-full xl:w-1/2">
              <div className="w-full p-2 sm:p-12.5 xl:p-15">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
