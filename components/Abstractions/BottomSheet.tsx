"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { BottomSheetProps } from "@/constants/types";
import Image from "next/image";
import Portal from "./Portal";

export default function BottomSheet({
  paramKey = "bs",
  paramValue = "open",
  children,
  title,
  onClose = () => {},
}: BottomSheetProps) {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const currentParamValue = searchParams.get(paramKey);
    setIsOpen(currentParamValue === paramValue);
  }, [paramKey, paramValue, searchParams]);

  return (
    <Portal>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          pointerEvents: isOpen ? "auto" : "none",
          width: "100%",
          maxWidth: 460,
          margin: "0 auto",
        }}
      >
        {/* Backdrop */}
        <div
          onClick={onClose}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            transition: "opacity 0.3s ease-in-out",
            opacity: isOpen ? 1 : 0,
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#fff",
            boxShadow: "0 -2px 8px rgba(0,0,0,0.15)",
            transition: "transform 0.3s ease-in-out",
            transform: isOpen ? "translateY(0)" : "translateY(100%)",
            zIndex: 1,
          }}
        >
          {title ? (
            <div className="flex justify-between items-center p-4 border-b-[1px] border-gray-200">
              <p className="font-semibold">{title}</p>
              <Image
                aria-hidden
                src="/images/close.svg"
                alt="close icon"
                width={14}
                height={14}
                onClick={onClose}
                className="cursor-pointer"
              />
            </div>
          ) : null}
          <div style={{ padding: "1rem" }}>{children}</div>
        </div>
      </div>
    </Portal>
  );
}
