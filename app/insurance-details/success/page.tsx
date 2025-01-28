"use client";

import ConfirmButton from "@/components/abstractions/ConfirmButton";
import Header from "@/components/ui/Header";
import InsuranceDetails from "@/app/insurance-details/components/ui/InsuranceDetails";
import LicensePlate from "@/components/ui/LicensePlate";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Success() {
  const router = useRouter();
  function handleClick() {
    router.back();
  }
  return (
    <div className="flex flex-col items-center justify-center bg-white  h-[calc(100vh-74px)]">
      <Header title="مشخصات بیمه نامه" />;
      <Image
        aria-hidden
        src="/images/successFormSubmition.png"
        alt="delete icon"
        width={60}
        height={60}
      />
      <p className="mt-4 font-semibold mb-8">
        ثبت اطلاعات شما، با <span className="text-[#34A862]">موفقیت</span> انجام
        شد.
      </p>
      <LicensePlate />
      <InsuranceDetails />
      <ConfirmButton
        text="بازگشت"
        onClick={handleClick}
        classes="bg-black text-white px-8 mr-auto ml-4 mt-auto mb-4"
      />
    </div>
  );
}

export default Success;
