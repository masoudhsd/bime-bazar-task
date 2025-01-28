import React from "react";
import ConfirmButton from "./ConfirmButton";
import { DeletedAddressBottomSheetProps } from "@/constants/types";

function DeletedAddressBottomSheet({
  deletedAddress,
  dispatch,
  selectedAddress,
  addresses,
  onClose,
}: DeletedAddressBottomSheetProps) {
  return (
    <div>
      <p className="font-semibold text-end my-2">
        آیا از حذف آدرس خود، مطمین هستید؟
      </p>
      <div className="bg-gray-200 p-4">
        <div className="flex justify-end">
          <p className="text-black font-semibold">{deletedAddress?.name}</p>
        </div>
        <p className="text-sm text-end">{deletedAddress?.details}</p>
      </div>
      <div className="flex">
        <ConfirmButton
          text="بازگشت"
          onClick={() => {
            onClose();
          }}
          textColor="text-black"
          bgColor="bg-white"
          isLoading={false}
          classes="w-full mx-1 my-2 outline-solid"
        />
        <ConfirmButton
          text="تایید"
          onClick={() => {
            // If the deleted address was also selected, reset the selection
            if (selectedAddress?.id === deletedAddress?.id) {
              dispatch({ type: "SET_SELECTED_ADDRESS", payload: null });
            }
            // Filter out the deleted address and update the array
            dispatch({
              type: "SET_ADDRESSES",
              payload: addresses.filter(
                (addr) => addr?.id !== deletedAddress?.id
              ),
            });
            onClose();
          }}
          textColor="text-white"
          bgColor="bg-black"
          isLoading={false}
          classes="w-full mx-1 my-2"
        />
      </div>
    </div>
  );
}

export default DeletedAddressBottomSheet;
