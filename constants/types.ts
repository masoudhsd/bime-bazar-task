import { ReactNode } from "react";

export type Address = {
  id: string;
  name: string;
  details: string;
} | null;

export type Action =
  | { type: "SET_NATIONAL_CODE"; payload: string }
  | { type: "SET_PHONE_NUMBER"; payload: string }
  | { type: "VALIDATE_NATIONAL_CODE" }
  | { type: "VALIDATE_PHONE_NUMBER" }
  | { type: "VALIDATE_ADDRESS" }
  | { type: "SET_ADDRESSES"; payload: Address[] }
  | { type: "SET_SELECTED_ADDRESS"; payload: Address | null }
  | { type: "SET_DELETED_ADDRESS"; payload: Address | null }
  | { type: "IS_SUBMIT_ORDER_LOADING"; payload: boolean }
  | { type: "RESET_ADDRESS" }
  | { type: "RESET_ERRORS" };

export interface BottomSheetProps {
  paramKey?: string;
  paramValue?: string;
  children: ReactNode;
  onClose?: () => void;
}

export interface BottomSheetsOfHomeProps {
  addresses: Address[];
  deletedAddress: Address | null;
  selectedAddress: Address | null;
  dispatch: React.Dispatch<Action>;
  handlePostFormData: () => void;
  openSheet: (param: string, value: string) => void;
  isSubmitOrderLoading: boolean;
}
export interface DeletedAddressBottomSheetProps {
  addresses: Address[];
  deletedAddress: Address | null;
  selectedAddress: Address | null;
  dispatch: React.Dispatch<Action>;
  onClose: () => void;
}

export interface HomePageFormState {
  nationalCode: string;
  nationalCodeError: string;
  phoneNumber: string;
  phoneNumberError: string;
  addresses: Address[];
  selectedAddress: Address | null;
  deletedAddress: Address | null;
  submitError: string;
  submitMessage: string;
  submitLoading: boolean;
  addressError: boolean;
  isSubmitOrderLoading: boolean;
}
