import isValidIranianNationalCode from "@/helpers/isValidIranianNationalCode";
import { Reducer } from "react";
type State = {
  nationalCode: string;
  nationalCodeError: string;
  phoneNumber: string;
  phoneNumberError: string;
};
type Action =
  | { type: "SET_NATIONAL_CODE"; payload: string }
  | { type: "SET_PHONE_NUMBER"; payload: string }
  | { type: "VALIDATE_NATIONAL_CODE" }
  | { type: "VALIDATE_PHONE_NUMBER" }
  | { type: "RESET_ERRORS" };

const initialState: State = {
  nationalCode: "",
  nationalCodeError: "",
  phoneNumber: "",
  phoneNumberError: "",
};

function useFormReducer() {
  const inputReducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
      case "SET_NATIONAL_CODE": {
        const value = action.payload;
        if (value.length > 10) {
          return state;
        }
        // Only digits
        if (!/^\d*$/.test(value)) {
          return state;
        }
        return {
          ...state,
          nationalCode: value,
          nationalCodeError: "",
        };
      }

      case "SET_PHONE_NUMBER": {
        // Only digits
        if (!/^\d*$/.test(action.payload)) {
          return state;
        }
        if (action.payload.length > 11) {
          return state;
        }
        return {
          ...state,
          phoneNumber: action.payload,
          phoneNumberError: "",
        };
      }

      case "VALIDATE_NATIONAL_CODE": {
        if (state.nationalCode.trim().length === 0) {
          return {
            ...state,
            nationalCodeError: "کد ملی نباید خالی باشد.",
          };
        }
        if (state.nationalCode.length !== 10) {
          return {
            ...state,
            nationalCodeError: "کد ملی باید دقیقا 10 رقم باشد.",
          };
        }

        if (!isValidIranianNationalCode(state.nationalCode)) {
          return {
            ...state,
            nationalCodeError: "کدملی وارد شده معتبر نیست.",
          };
        }
        return {
          ...state,
          nationalCodeError: "",
        };
      }

      case "VALIDATE_PHONE_NUMBER": {
        const phonePattern = /^09\d{9}$/;

        if (state.phoneNumber.trim().length === 0) {
          return {
            ...state,
            phoneNumberError: "شماره تلفن همراه باید ۱۰ رقم باشد.",
          };
        }

        if (!phonePattern.test(state.phoneNumber)) {
          return {
            ...state,
            phoneNumberError: "شماره تلفن همراه معتبر نیست.",
          };
        }

        return { ...state, phoneNumberError: "" };
      }

      case "RESET_ERRORS": {
        return {
          ...state,
          nationalCodeError: "",
          phoneNumberError: "",
        };
      }

      default:
        return state;
    }
  };
  return { initialState, inputReducer };
}

export default useFormReducer;
