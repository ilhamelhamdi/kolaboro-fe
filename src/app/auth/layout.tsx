import Link from "next/link";
import React from "react";

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen w-screen flex">
      <div className="fixed top-0 px-10 py-4">
        <Link href={"/"}>
          <h1 className="font-bold text-xl">Kolaboro</h1>
        </Link>
      </div>
      {children}
    </main>
  );
}

export default AuthLayout;
