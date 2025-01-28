"use client";
import React, {
  memo,
  useEffect,
  useReducer,
  ChangeEvent,
  useCallback,
  useMemo,
} from "react";

import BottomSheetsOfHome from "@/components/BottomSheetsOfHome";
import ConfirmButton from "@/components/ConfirmButton";
import Header from "@/components/Header";
import InsuranceDetails from "@/components/InsuranceDetails";
import LicensePlate from "@/components/LicensePlate";
import { BASE_URL } from "@/constants/urls";
import useFormReducer from "@/hooks/useFormReducer";
import useQueryParams from "@/hooks/useQueryParams";

function Home() {
  const { initialState, inputReducer } = useFormReducer();
  const [state, dispatch] = useReducer(inputReducer, initialState);

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
    const fetchAddresses = async () => {
      try {
        const response = await fetch(BASE_URL + "/my-addresses/");
        if (!response.ok) {
          throw new Error("Failed to fetch addresses.");
        }
        const data = await response.json();
        dispatch({ type: "SET_ADDRESSES", payload: data });
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error(String(err));
        }
      }
    };
    fetchAddresses();
  }, []);

  const openSheet = useCallback(
    (param: string, value: string) => {
      setQueryParam(param, value);
    },
    [setQueryParam]
  );

  const handlePostFormData = useCallback(async () => {
    dispatch({ type: "IS_SUBMIT_ORDER_LOADING", payload: true });
    const formData = {
      nationalId: nationalCode,
      phoneNumber: phoneNumber,
      addressId: selectedAddress?.id,
    };
    try {
      const response = await fetch(BASE_URL + "/order/completion/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to complete the order.");
      }
      // const data = await response.json();
    } catch (err: unknown) {
      if (err instanceof Error) {
        openSheet("order-submit-error", "open");
        dispatch({ type: "IS_SUBMIT_ORDER_LOADING", payload: false });
        console.error(err.message || "An error occurred.");
      } else {
        console.error(String(err));
      }
    } finally {
      dispatch({ type: "IS_SUBMIT_ORDER_LOADING", payload: false });
    }
  }, [dispatch, nationalCode, phoneNumber, selectedAddress, openSheet]);

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
    nationalCode,
    phoneNumber,
    selectedAddress,
    handlePostFormData,
  ]);

  return (
    <div
      className="items-center justify-items-center min-h-screen max-w-[458px] mx-auto bg-white"
      style={{ direction: "rtl" }}
    >
      <Header title="مشخصات بیمه نامه" />

      <LicensePlate />
      <InsuranceDetails />

      <div className="mt-4 w-full">
        <Header title="مشخصات مالک خودرو" />
      </div>

      <p className="font-bold mr-auto pr-4">
        اطلاعات شخصی مالک خودرو را وارد کنید:
      </p>

      <div className="flex flex-col w-full px-4">
        <input
          type="text"
          placeholder="کد ملی"
          className={`border-[1px] border-gray-400 p-2 my-2 h-12 text-[#757575] font-medium ${
            nationalCodeError ? "border-red-600" : ""
          }`}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "SET_NATIONAL_CODE", payload: e.target.value })
          }
          value={nationalCode}
        />
        {nationalCodeError && (
          <span className="text-red-600 text-sm">{nationalCodeError}</span>
        )}

        <input
          type="text"
          placeholder="شماره تلفن همراه"
          className={`border-[1px] border-gray-400 p-2 my-2 h-12 text-[#757575] font-medium ${
            phoneNumberError ? "border-red-600" : ""
          }`}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "SET_PHONE_NUMBER", payload: e.target.value })
          }
          value={phoneNumber}
        />
        {phoneNumberError && (
          <span className="text-red-600 text-sm">{phoneNumberError}</span>
        )}
      </div>

      <p className="font-bold mr-auto pr-4 my-2">آدرس جهت درج روی بیمه‌نامه</p>

      <p
        className={`text-sm mr-auto my-2 px-4 sm:px-0 ${
          addressError ? "text-red-600" : ""
        }`}
      >
        {selectedAddress
          ? selectedAddress.details
          : " لطفا آدرسی را که می‌خواهید روی بیمه نامه درج شود وارد کنید."}
      </p>

      <div className="w-full px-4">
        <button
          className="bg-yellow text-black p-4 font-semibold w-full"
          onClick={() => openSheet("bs1", "open")}
        >
          انتخاب از آدرس‌های من
        </button>
      </div>

      <div className="mr-auto ml-4 w-fit">
        <ConfirmButton
          text="تایید و ادامه"
          onClick={handleConfirmForm}
          textColor={isAllowedToSubmit ? "text-white" : "text-[#DAD8D8]"}
          bgColor={isAllowedToSubmit ? "bg-black" : "bg-gray-400"}
          isLoading={isSubmitOrderLoading}
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
          handlePostFormData,
          isSubmitOrderLoading,
        }}
      />

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start"></main>
    </div>
  );
}

export default memo(Home);
