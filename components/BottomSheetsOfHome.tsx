"use client";

import React, { memo, useCallback } from "react";
import dynamic from "next/dynamic";
import ConfirmButton from "./ConfirmButton";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import DeletedAddressBottomSheet from "./DeletedAddressBottomSheet";
import { BottomSheetsOfHomeProps } from "@/constants/types";

const DynamicBottomSheet = dynamic(() => import("@/components/BottomSheet"));
const DynamicAdresses = dynamic(() => import("@/components/Adresses"));

function BottomSheetsOfHome({
  addresses,
  deletedAddress,
  isSubmitOrderLoading,
  dispatch,
  selectedAddress,
  handlePostFormData,
  openSheet,
}: BottomSheetsOfHomeProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setQueryParam = useCallback(
    (key: string, value?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleSheet1Close = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleSheet2Close = useCallback(() => {
    setQueryParam("bs2");
  }, [setQueryParam]);

  const handleCloseDeleteSheet = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div>
      {/* Bottom Sheet #1 */}
      <DynamicBottomSheet
        onClose={handleSheet1Close}
        paramKey="bs1"
        paramValue="open"
      >
        <DynamicAdresses
          addresses={addresses}
          dispatch={dispatch}
          selectedAddress={selectedAddress}
          openDeleteAddressSheet={() => openSheet("bs2", "open")}
        />

        <button
          className={`${
            selectedAddress
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-500"
          } p-4 font-semibold w-full mt-4`}
          onClick={() => router.back()}
        >
          انتخاب
        </button>
      </DynamicBottomSheet>

      {/* Bottom Sheet #2 */}
      <DynamicBottomSheet
        onClose={handleCloseDeleteSheet}
        paramKey="bs2"
        paramValue="open"
      >
        <DeletedAddressBottomSheet
          deletedAddress={deletedAddress}
          dispatch={dispatch}
          selectedAddress={selectedAddress}
          addresses={addresses}
          onClose={handleSheet2Close}
        />
      </DynamicBottomSheet>

      {/* Bottom Sheet #3 (Order submit error) */}
      <DynamicBottomSheet
        onClose={handleCloseDeleteSheet}
        paramKey="order-submit-error"
        paramValue="open"
      >
        <p className="font-bold mb-2 text-end">
          متاسفانه در ثبت اطلاعات شما، خطایی رخ داده است
        </p>
        <div className="flex">
          <ConfirmButton
            text="بازگشت"
            textColor="text-black"
            bgColor="bg-white"
            isLoading={false}
            classes="w-full mx-1 my-2 outline-auto"
            onClick={() => router.back()}
          />
          <ConfirmButton
            text="تلاش مجدد"
            classes="w-full mx-1 my-2 bg-black text-white"
            onClick={handlePostFormData}
            isLoading={isSubmitOrderLoading}
          />
        </div>
      </DynamicBottomSheet>
    </div>
  );
}

export default memo(BottomSheetsOfHome);
