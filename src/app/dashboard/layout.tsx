import Navbar from "@/components/layouts/Navbar";
import React from "react";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-screen min-h-screen">
      <Navbar />
      {children}
    </main>
  );
}

export default DashboardLayout;
