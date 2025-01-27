"use client";

import Image from "next/image";

function LicensePlate() {
  return (
    <div className="px-8 w-full">
      <div className="border-2 border-black flex items-center font-bold text-lg h-[50px] w-full">
        <div className="border-l-2 border-black flex items-center p-2.5">
          60
        </div>

        <div className="flex mr-auto">
          <p>65</p>
          <p className="mx-8">k</p>
          <p>9909</p>
        </div>
        <div className="border-r-2 border-black flex-col bg-[#1D48E1] h-full px-4 mr-auto">
          <Image
            aria-hidden
            src="/flag.png"
            alt="flag"
            width={30}
            height={20}
            className="mt-1"
          />
          <p className="font-extrabold text-white ml-auto">I.R.</p>
        </div>
      </div>
    </div>
  );
}

export default LicensePlate;
