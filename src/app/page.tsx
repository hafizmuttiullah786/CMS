"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "../../public/images/edu1-removebg-preview-2.png";

import "../css/loader.css";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    // <main>
    //   <svg
    //     className="ip"
    //     viewBox="0 0 256 128"
    //     width="256px"
    //     height="128px"
    //     xmlns="http://www.w3.org/2000/svg"
    //   >
    //     <defs>
    //       <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
    //         <stop offset="0%" stop-color="#7b2cbf" />
    //         <stop offset="33%" stop-color="#9d4edd" />
    //         <stop offset="67%" stop-color="#c77dff" />
    //         <stop offset="100%" stop-color="#e0aaff" />
    //       </linearGradient>

    //       <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
    //         <stop offset="0%" stop-color="#4a148c" />
    //         <stop offset="33%" stop-color="#7e57c2" />
    //         <stop offset="67%" stop-color="#9575cd" />
    //         <stop offset="100%" stop-color="#d1c4e9" />
    //       </linearGradient>
    //     </defs>
    //     <g fill="none" stroke-linecap="round" stroke-width="16">
    //       <g className="ip__track" stroke="#ddd">
    //         <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
    //         <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
    //       </g>
    //       <g stroke-dasharray="180 656">
    //         <path
    //           className="ip__worm1"
    //           stroke="url(#grad1)"
    //           stroke-dashoffset="0"
    //           d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"
    //         />
    //         <path
    //           className="ip__worm2"
    //           stroke="url(#grad2)"
    //           stroke-dashoffset="358"
    //           d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"
    //         />
    //       </g>
    //     </g>
    //   </svg>
    // </main>
    <div className="centerdiv">
      <svg
        className="pl"
        viewBox="0 0 200 200"
        width="200"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
            <stop offset="0%" stop-color="hsl(313,90%,55%)" />
            <stop offset="100%" stop-color="hsl(223,90%,55%)" />
          </linearGradient>
          <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="hsl(313,90%,55%)" />
            <stop offset="100%" stop-color="hsl(223,90%,55%)" />
          </linearGradient>
        </defs>
        <circle
          className="pl__ring"
          cx="100"
          cy="100"
          r="82"
          fill="none"
          stroke="url(#pl-grad1)"
          stroke-width="36"
          stroke-dasharray="0 257 1 257"
          stroke-dashoffset="0.01"
          stroke-linecap="round"
          transform="rotate(-90,100,100)"
        />
        <line
          className="pl__ball"
          stroke="url(#pl-grad2)"
          x1="100"
          y1="18"
          x2="100.01"
          y2="182"
          stroke-width="36"
          stroke-dasharray="1 165"
          stroke-linecap="round"
        />
      </svg>
      <Image src={Logo} width={200} height={200} />
    </div>
  );
};

export default page;
