"use client";

import React, { memo, useEffect, useCallback, useMemo } from "react";
import ConfirmButton from "@/components/abstractions/ConfirmButton";
import Header from "@/components/ui/Header";
import LicensePlate from "@/components/ui/LicensePlate";
import useQueryParams from "@/hooks/useQueryParams";
import { useGlobalState } from "@/context/InsuranceDetailsContext";
import useFetchAddresses from "@/app/insurance-details/hooks/useFetchAddresses";
import usePostInsuranceData from "@/app/insurance-details/hooks/usePostInsuranceData";
import FormElements from "@/app/insurance-details/components/ui/FormElements";
import InsuranceDetails from "@/app/insurance-details/components/ui/InsuranceDetails";
import BottomSheetsOfHome from "./components/bottomSheets/BottomSheetsOfHome";

function InsuranceDetailsPage() {
  const { state, dispatch } = useGlobalState();
  const { fetchAddresses } = useFetchAddresses();
  const { postInsuranceFormData } = usePostInsuranceData();

  const {
    nationalCode,
    nationalCodeError,
    phoneNumber,
    phoneNumberError,
    addresses,
    selectedAddress,
    deletedAddress,
    addressError,
    isSubmitOrderLoading,
  } = state;

  const { setQueryParam } = useQueryParams();

  const isAllowedToSubmit = useMemo(() => {
    return (
      !nationalCodeError &&
      !phoneNumberError &&
      phoneNumber.length > 0 &&
      nationalCode.length > 0
    );
  }, [nationalCodeError, phoneNumberError, phoneNumber, nationalCode]);

  useEffect(() => {
    if (addresses.length > 0) return;
    fetchAddresses(dispatch);
  }, [addresses.length]);

  const openSheet = useCallback(
    (param: string, value: string) => {
      setQueryParam(param, value);
    },
    [setQueryParam]
  );
  const handlePostFormData = useCallback(() => {
    const formData = {
      nationalId: nationalCode,
      phoneNumber: phoneNumber,
      addressId: selectedAddress?.id || "",
    };
    postInsuranceFormData({ formData, dispatch, openSheet });
  }, [
    dispatch,
    nationalCode,
    openSheet,
    phoneNumber,
    postInsuranceFormData,
    selectedAddress?.id,
  ]);
  const handleConfirmForm = useCallback(() => {
    dispatch({ type: "VALIDATE_NATIONAL_CODE" });
    dispatch({ type: "VALIDATE_PHONE_NUMBER" });
    dispatch({ type: "VALIDATE_ADDRESS" });

    if (
      !nationalCodeError &&
      !phoneNumberError &&
      !addressError &&
      nationalCode.length > 0 &&
      phoneNumber.length > 0 &&
      selectedAddress
    ) {
      handlePostFormData();
    }
  }, [
    dispatch,
    nationalCodeError,
    phoneNumberError,
    addressError,
    nationalCode.length,
    phoneNumber.length,
    selectedAddress,
    handlePostFormData,
  ]);

  return (
    <div className="items-center justify-items-center min-h-screen mx-auto bg-white max-w-[460px]">
      <Header title="مشخصات بیمه نامه" />
      <LicensePlate />
      <InsuranceDetails />
      <div className="mt-4 w-full">
        <Header title="مشخصات مالک خودرو" />
      </div>
      <FormElements
        {...{
          dispatch,
          nationalCodeError,
          nationalCode,
          phoneNumberError,
          selectedAddress,
          addressError,
          phoneNumber,
          openSheet,
        }}
      />

      <div className="mr-auto ml-4 w-fit">
        <ConfirmButton
          text="تایید و ادامه"
          onClick={handleConfirmForm}
          textColor={isAllowedToSubmit ? "text-white" : "text-[#DAD8D8]"}
          bgColor={isAllowedToSubmit ? "bg-black" : "bg-gray-400"}
          classes="my-4"
        />
      </div>
      <BottomSheetsOfHome
        {...{
          openSheet,
          selectedAddress,
          deletedAddress,
          addresses,
          dispatch,
          isSubmitOrderLoading,
        }}
        postInsuranceFormData={handlePostFormData}
      />

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start"></main>
    </div>
  );
}

export default memo(InsuranceDetailsPage);
