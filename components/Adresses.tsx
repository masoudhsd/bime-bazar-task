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

function Addresses({
  addresses,
  selectedAddress,
  dispatch,
  openDeleteAddressSheet,
}: AddressesProps) {
  function handleClick(address: Address) {
    dispatch({ type: "SET_DELETED_ADDRESS", payload: address });
    openDeleteAddressSheet();
  }
  return (
    <>
      {addresses.map((address) => (
        <div key={address?.id} className="w-full flex flex-col justify-center">
          <div className="flex justify-end">
            <Image
              aria-hidden
              src="/delete.svg"
              alt="delete icon"
              width={16}
              height={16}
              onClick={() => handleClick(address)}
              className="mr-auto cursor-pointer"
            />
            <p className="text-sm mx-2">{address?.name}</p>
            <input
              type="radio"
              name="address"
              onChange={() =>
                dispatch({
                  type: "SET_SELECTED_ADDRESS",
                  payload: address,
                })
              }
              value={address?.id}
              checked={selectedAddress?.id === address?.id}
              className="cursor-pointer"
            />
          </div>
          <p className="text-xs text-end">{address?.details}</p>
        </div>
      ))}
    </>
  );
}

export default React.memo(Addresses);
