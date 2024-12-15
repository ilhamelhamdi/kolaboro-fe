"use client";
import { useAuth } from "@/components/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="fixed top-0 left-0 w-full px-10 py-4">
        <Link href={"/"}>
          <h1 className="font-bold text-xl">Kolaboro</h1>
        </Link>
      </div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-screen-md">
        <h1 className="font-semibold text-5xl text-center">
          LET'S JOIN FOR COLLABORATING AND SHARING CREATIVE IDEAS IN REALTIME{" "}
        </h1>

        <div className="w-full flex gap-4 items-center flex-col sm:flex-row sm:justify-center">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/auth/signup"
          >
            Sign up now
          </Link>
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/auth/login"
          >
            Login
          </Link>
        </div>
      </main>
    </div>
  );
}
