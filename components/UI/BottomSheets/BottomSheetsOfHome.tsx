"use client";

import React, { memo, useCallback } from "react";
import dynamic from "next/dynamic";
import ConfirmButton from "../../Abstractions/ConfirmButton";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import DeletedAddressBottomSheet from "./DeletedAddressBottomSheet";
import { BottomSheetsOfHomeProps } from "@/constants/types";

const DynamicBottomSheet = dynamic(
  () => import("@/components/Abstractions/BottomSheet")
);
const DynamicAdresses = dynamic(
  () => import("@/components/UI/BottomSheets/AdressesBottomSheet")
);

function BottomSheetsOfHome({
  addresses,
  deletedAddress,
  isSubmitOrderLoading,
  dispatch,
  selectedAddress,
  postInsuranceFormData,
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
    dispatch({ type: "SET_SELECTED_ADDRESS", payload: null });
  }, [dispatch, router]);

  const handleSheet2Close = useCallback(() => {
    setQueryParam("bs2");
  }, [setQueryParam]);

  const handleCloseDeleteSheet = useCallback(() => {
    router.back();
  }, [router]);

  const handleClickChooseAddress = useCallback(() => {
    if (!selectedAddress) return;
    router.push("/");
  }, [router, selectedAddress]);

  return (
    <div>
      {/* Bottom Sheet #1 */}
      <DynamicBottomSheet
        onClose={handleSheet1Close}
        paramKey="bs1"
        paramValue="open"
        title="انتخاب آدرس"
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
          onClick={handleClickChooseAddress}
        >
          انتخاب
        </button>
      </DynamicBottomSheet>

      {/* Bottom Sheet #2 */}
      <DynamicBottomSheet
        onClose={handleCloseDeleteSheet}
        paramKey="bs2"
        paramValue="open"
        title="حذف آدرس"
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
        <p className="font-bold mb-2 text-start">
          متاسفانه در ثبت اطلاعات شما، خطایی رخ داده است
        </p>
        <div className="flex">
          <ConfirmButton
            text="تلاش مجدد"
            classes="w-full mx-1 my-2 bg-black text-white"
            onClick={postInsuranceFormData}
            isLoading={isSubmitOrderLoading}
          />
          <ConfirmButton
            text="بازگشت"
            textColor="text-black"
            bgColor="bg-white"
            isLoading={false}
            classes="w-full mx-1 my-2 outline-auto"
            onClick={() => router.back()}
          />
        </div>
      </DynamicBottomSheet>
    </div>
  );
}

export default memo(BottomSheetsOfHome);
