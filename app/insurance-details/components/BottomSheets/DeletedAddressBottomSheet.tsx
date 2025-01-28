import React from "react";

import { DeletedAddressBottomSheetProps } from "@/constants/types";
import ConfirmButton from "@/components/abstractions/ConfirmButton";

function DeletedAddressBottomSheet({
  deletedAddress,
  dispatch,
  selectedAddress,
  addresses,
  onClose,
}: DeletedAddressBottomSheetProps) {
  function handleDelete() {
    if (selectedAddress?.id === deletedAddress?.id) {
      dispatch({ type: "SET_SELECTED_ADDRESS", payload: null });
    }

    dispatch({
      type: "SET_ADDRESSES",
      payload: addresses.filter((addr) => addr?.id !== deletedAddress?.id),
    });
    onClose();
  }
  return (
    <div>
      <p className="font-semibold text-start my-2">
        آیا از حذف آدرس خود، مطمین هستید؟
      </p>
      <div className="bg-gray-200 p-4 my-4">
        <div className="flex justify-start">
          <p className="text-black font-semibold">{deletedAddress?.name}</p>
        </div>
        <p className="text-sm text-start">{deletedAddress?.details}</p>
      </div>
      <div className="flex">
        <ConfirmButton
          text="تایید"
          onClick={handleDelete}
          textColor="text-white"
          bgColor="bg-black"
          isLoading={false}
          classes="w-full mx-1 my-2"
        />
        <ConfirmButton
          text="بازگشت"
          onClick={() => {
            onClose();
          }}
          textColor="text-black"
          bgColor="bg-white"
          isLoading={false}
          classes="w-full mx-1 my-2 outline outline-black outline-solid"
        />
      </div>
    </div>
  );
}

export default DeletedAddressBottomSheet;
