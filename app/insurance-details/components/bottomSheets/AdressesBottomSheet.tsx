"use client";

import React from "react";
import Image from "next/image";
import { Action, Address } from "@/constants/types";

interface AddressesProps {
  addresses: Address[];
  selectedAddress: Address | null;
  openDeleteAddressSheet: () => void;
  dispatch: React.Dispatch<Action>;
}

function AddressesBottomSheet({
  addresses,
  selectedAddress,
  dispatch,
  openDeleteAddressSheet,
}: AddressesProps) {
  function handleClick(address: Address) {
    dispatch({ type: "SET_DELETED_ADDRESS", payload: address });
    openDeleteAddressSheet();
  }

  function handleCloseSheet(address: Address) {
    dispatch({
      type: "SET_SELECTED_ADDRESS",
      payload: address,
    });
    dispatch({
      type: "RESET_ADDRESS_ERROR",
    });
  }
  return (
    <>
      {addresses.map((address) => (
        <div
          key={address?.id}
          className="w-full flex flex-col justify-center my-6"
        >
          <div className="flex justify-center flex-row-reverse">
            <Image
              aria-hidden
              src="/images/delete.svg"
              alt="delete icon"
              width={10}
              height={10}
              onClick={() => handleClick(address)}
              className="mr-auto cursor-pointer"
            />
            <p className="text-sm mx-2 font-semibold">{address?.name}</p>
            <input
              type="radio"
              name="address"
              onChange={() => handleCloseSheet(address)}
              value={address?.id}
              checked={selectedAddress?.id === address?.id}
              className="cursor-pointer"
            />
          </div>
          <p className="text-xs text-start mt-2 text-subTextGray">
            {address?.details}
          </p>
        </div>
      ))}
    </>
  );
}

export default React.memo(AddressesBottomSheet);
