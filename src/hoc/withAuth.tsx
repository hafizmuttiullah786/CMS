"use client";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = "abc";
    if (!token) {
      setIsAuthenticated(false);
      redirect("/auth/signin");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <></>
      // <div
      //   style={{
      //     height: "100vh",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //   }}
      // >
      //   <p>Loading...</p>
      // </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedLayout;
