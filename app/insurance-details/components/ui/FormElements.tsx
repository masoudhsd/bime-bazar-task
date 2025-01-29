"use client";

import { Action, Address } from "@/constants/types";
import { ChangeEvent, Dispatch } from "react";
interface InputsProps {
  dispatch: Dispatch<Action>;
  nationalCodeError?: string;
  nationalCode: string;
  phoneNumberError?: string;
  phoneNumber: string;
  selectedAddress?: Address;
  addressError?: boolean;
  openSheet: (param: string, value: string) => void;
}

function FormElements({
  dispatch,
  nationalCodeError,
  nationalCode,
  phoneNumberError,
  selectedAddress,
  addressError,
  phoneNumber,
  openSheet,
}: InputsProps) {
  return (
    <>
      <p className="font-bold ml-auto pr-4">
        اطلاعات شخصی مالک خودرو را وارد کنید:
      </p>
      <div className="flex flex-col w-full px-4">
        <input
          type="tel"
          placeholder="کد ملی"
          className={`border-[1px] border-gray-400 p-2 my-2 h-12 text-[#757575] font-medium ${
            nationalCodeError ? "border-error" : ""
          }`}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "SET_NATIONAL_CODE", payload: e.target.value })
          }
          value={nationalCode}
        />
        {nationalCodeError && (
          <span className="text-error text-sm">{nationalCodeError}</span>
        )}
        <input
          type="tel"
          placeholder="شماره تلفن همراه"
          className={`border-[1px] border-gray-400 p-2 my-2 h-12 text-[#757575] font-medium ${
            phoneNumberError ? "border-error" : ""
          }`}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "SET_PHONE_NUMBER", payload: e.target.value })
          }
          value={phoneNumber}
        />
        {phoneNumberError && (
          <span className="text-error text-sm">{phoneNumberError}</span>
        )}
      </div>

      <p className="font-bold ml-auto pr-4 mt-2">آدرس جهت درج روی بیمه‌نامه</p>

      <p
        className={`text-sm ml-auto my-2 pr-4 text-subTextGray ${
          addressError ? "text-error" : ""
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
    </>
  );
}

export default FormElements;
