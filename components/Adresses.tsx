"use client";

import React from "react";
import Image from "next/image";
import ConfirmButton from "./ConfirmButton";

interface Address {
  id: string;
  name: string;
  details: string;
}

interface AddressesProps {
  addresses: Address[];
  selectedAddress: Address;
  setAddresses: () => void;
  setSelectedAddress: () => void;
  setDeleteAddress: () => void;
  deletedAddress: string;
}

function Addresses({
  addresses,
  setAddresses,
  setSelectedAddress,
  selectedAddress,
  setDeleteAddress,
  deletedAddress,
}: AddressesProps) {
  console.log(selectedAddress);
  function handleDelete(id: string) {
    setDeleteAddress(addresses.find((item) => item.id === id));
  }
  function deleteAddress(id: string) {
    if (selectedAddress?.id === id) setSelectedAddress(null);
    setAddresses((prev) => prev.filter((item) => item.id !== id));
    setDeleteAddress(null);
  }
  function handleChange(e: { target: { value: string } }) {
    const selectedAddress = addresses.find(
      (item) => item.id === e.target.value
    );
    setSelectedAddress(selectedAddress);
  }
  function handleBackFromDelete(e: { target: { value: string } }) {
    setDeleteAddress(null);
  }

  if (deletedAddress !== null) {
    return (
      <div>
        <p className="font-semibold text-end my-2">
          آیا از حذف آدرس خود، مطمین هستید؟
        </p>
        <div className=" bg-gray-200 p-4">
          <div className="flex justify-end">
            <p className="text-black font-semibold">{deletedAddress?.name}</p>
          </div>
          <p className="text-sm text-end">{deletedAddress?.details}</p>
        </div>
        <div className="flex">
          <ConfirmButton
            text="بازگشت"
            onClick={() => handleBackFromDelete()}
            textColor="text-black"
            bgColor="bg-white"
            isLoading={false}
            classes="w-full mx-1 my-2 outline-solid"
          />
          <ConfirmButton
            text="تایید"
            onClick={() => deleteAddress(deletedAddress?.id)}
            textColor="text-white"
            bgColor="bg-black"
            isLoading={false}
            classes="w-full mx-1 my-2"
          />
        </div>
      </div>
    );
  }

  return addresses?.map((address) => (
    <div key={address.id} className="w-full flex flex-col justify-center">
      <div className="flex justify-end">
        <Image
          aria-hidden
          src="/delete.svg"
          alt="delete icon"
          width={16}
          height={16}
          onClick={() => handleDelete(address?.id)}
          className="mr-auto"
        />
        <p className="text-sm mx-2">{address?.name}</p>
        <input
          type="radio"
          name="address"
          onChange={handleChange}
          value={address?.id}
          checked={selectedAddress?.id === address?.id}
          className="cursor-pointer"
        />
      </div>
      <p className="text-xs text-end">{address.details}</p>
    </div>
  ));
}

export default React.memo(Addresses);
