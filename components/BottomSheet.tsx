"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";

interface BottomSheetProps {
  paramKey?: string;
  paramValue?: string;
  height?: string;
  children: ReactNode;
}

export default function BottomSheet({
  paramKey = "bs",
  paramValue = "open",
  height = "250px",
  children,
}: BottomSheetProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // Sync the local "isOpen" state with the URL param
  useEffect(() => {
    const currentParamValue = searchParams.get(paramKey);
    setIsOpen(currentParamValue === paramValue);
  }, [paramKey, paramValue, searchParams]);

  // Closes the bottom sheet (removing the query param)
  const close = () => {
    router.back();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: isOpen ? "auto" : "none",
        width: 460,
        margin: "auto",
      }}
    >
      {/* Backdrop (full-screen overlay) */}
      <div
        onClick={close}
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
          height,
          backgroundColor: "#fff",
          boxShadow: "0 -2px 8px rgba(0,0,0,0.15)",
          transition: "transform 0.3s ease-in-out",
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: "right", padding: "1rem" }}>
          <button onClick={close}>Close</button>
        </div>
        <div style={{ padding: "1rem" }}>{children}</div>
      </div>
    </div>
  );
}
