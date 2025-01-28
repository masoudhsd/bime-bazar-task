import { Action, HomePageFormState } from "@/constants/types";
import isValidIranianNationalCode from "@/helpers/isValidIranianNationalCode";
import { Reducer } from "react";

const initialState: HomePageFormState = {
  nationalCode: "",
  nationalCodeError: "",
  phoneNumber: "",
  phoneNumberError: "",
  addresses: [],
  selectedAddress: null,
  deletedAddress: null,
  submitError: "",
  submitMessage: "",
  submitLoading: false,
  addressError: false,
  isSubmitOrderLoading: false,
};

function useFormReducer() {
  const inputReducer: Reducer<HomePageFormState, Action> = (state, action) => {
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
        const phonePattern = /^(09\d{9}|9\d{9})$/;

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

        return {
          ...state,
          phoneNumberError: "",
        };
      }
      case "VALIDATE_ADDRESS": {
        if (state.selectedAddress === null) {
          return {
            ...state,
            addressError: true,
          };
        }

        return {
          ...state,
          addressError: false,
        };
      }

      case "SET_ADDRESSES": {
        return {
          ...state,
          addresses: action.payload,
        };
      }

      case "SET_SELECTED_ADDRESS": {
        return {
          ...state,
          selectedAddress: action.payload,
        };
      }

      case "SET_DELETED_ADDRESS": {
        return {
          ...state,
          deletedAddress: action.payload,
        };
      }

      case "IS_SUBMIT_ORDER_LOADING": {
        return {
          ...state,
          isSubmitOrderLoading: action.payload,
        };
      }

      case "RESET_ADDRESS": {
        return {
          ...state,
          selectedAddress: null,
        };
      }
      case "RESET_ADDRESS_ERROR": {
        return {
          ...state,
          addressError: false,
        };
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
