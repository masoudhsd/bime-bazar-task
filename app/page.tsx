"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("insurance-details");
  }, [router]);
  return null;
}

export default Home;
