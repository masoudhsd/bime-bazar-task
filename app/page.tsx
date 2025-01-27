"use client";

import ConfirmButton from "@/components/ConfirmButton";
import Header from "@/components/Header";
import LicensePlate from "@/components/LicensePlate";
import { BASE_URL } from "@/constants/urls";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DynamicBottomSheet = dynamic(() => import("@/components/BottomSheet"));
const DynamicAdresses = dynamic(() => import("@/components/Adresses"));

interface Address {
  id: string;
  name: string;
  details: string;
}

export default function Home() {
  const router = useRouter();

  const openSheet = () => {
    router.push("?bs=open", { scroll: false });
  };

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address>(null);
  const [deletedAddress, setDeleteAddress] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL + "/my-addresses/");
        if (!response.ok) {
          throw new Error("Failed to fetch addresses.");
        }
        const data = await response.json();
        setAddresses(data);
      } catch (err: any) {
        setError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  return (
    <div
      className="items-center justify-items-center min-h-screen max-w-[458px] mx-auto bg-white"
      style={{ direction: "rtl" }}
    >
      <Header title="مشخصات بیمه نامه" />
      <LicensePlate />
      <div className="flex items-center justify-around w-full px-8 my-4">
        <p className="text-gray-500 whitespace-pre">شرکت بیمه گر</p>
        <div className="border-b-[1px] border-dotted border-gray-300 w-full mx-1"></div>
        <p className="whitespace-pre">پارسیان</p>
      </div>
      <div className="flex items-center justify-around w-full px-8 my-4">
        <p className="text-gray-500 whitespace-pre">برند خودرو</p>
        <div className="border-b-[1px] border-dotted border-gray-300 w-full mx-1"></div>
        <p className="whitespace-pre">پژو</p>
      </div>
      <div className="flex items-center justify-around w-full px-8 my-4">
        <p className="text-gray-500 whitespace-pre">مدل خودرو</p>
        <div className="border-b-[1px] border-dotted border-gray-300 w-full mx-1"></div>
        <p className="whitespace-pre">206 تیپ 6</p>
      </div>
      <div className="mt-4 w-full">
        <Header title="مشخصات مالک خودرو" />
      </div>
      <p className="font-bold mr-auto pr-8">
        اطلاعات شخصی مالک خودرو را وارد کنید:
      </p>
      <div className="flex flex-col w-full px-8">
        <input
          type="number"
          placeholder="کد ملی"
          className="border-[1px] border-gray-400 p-2 my-2 h-12 text-[#757575] font-medium"
        />
        <input
          type="number"
          placeholder="شماره تلفن همراه"
          className="border-[1px] border-gray-400 p-2 my-2 h-12 text-[#757575] font-medium"
        />
      </div>
      <p className="font-bold mr-auto pr-8 my-2">آدرس جهت درج روی بیمه‌نامه</p>
      <p className="text-sm mr-auto my-2 px-4 sm:px-0 pr-8">
        لطفا آدرسی را که می‌خواهید روی بیمه نامه درج شود وارد کنید.
      </p>
      <div className="w-full px-8">
        <button
          className="bg-yellow text-black p-4 font-semibold w-full"
          onClick={openSheet}
        >
          انتخاب از آدرس‌های من
        </button>
      </div>
      <div className="">
        <ConfirmButton
          text="تایید و ادامه"
          onClick={() => console.log("h")}
          textColor="[#DAD8D8]"
          bgColor="[#858484]"
          isLoading={false}
          classes="my-4 mr-auto"
        />
      </div>
      <DynamicBottomSheet>
        <DynamicAdresses
          addresses={addresses}
          selectedAddress={selectedAddress}
          setAddresses={setAddresses}
          setSelectedAddress={setSelectedAddress}
          setDeleteAddress={setDeleteAddress}
          deletedAddress={deletedAddress}
        />
        {!deletedAddress ? (
          <button
            className={`${
              selectedAddress
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-500"
            } p-4 font-semibold w-full mt-4`}
            onClick={openSheet}
          >
            انتخاب
          </button>
        ) : null}
      </DynamicBottomSheet>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start"></main>
    </div>
  );
}
