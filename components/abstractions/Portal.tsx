"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}

export default function Portal({ children }: PortalProps) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const existingPortalRoot = document.getElementById("portal-root");
    if (existingPortalRoot) {
      setPortalRoot(existingPortalRoot as HTMLElement);
    }
  }, []);

  if (!portalRoot) return null;

  return createPortal(children, portalRoot);
}
