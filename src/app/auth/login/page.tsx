"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginFormData, LoginResponse } from "./interface";
import { hashPassword } from "@/components/utils/PasswordUtils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/AuthContext";

function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginFormData>();
  const { setIsAuthenticated, setAccessToken, setUser } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    const hashedData = {
      ...data,
      password: await hashPassword(data.password),
    };
    console.log(hashedData);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(hashedData),
      }
    );

    const resJson = (await response.json()) as LoginResponse;

    if (response.ok) {
      setIsAuthenticated(true);
      setAccessToken(resJson.data!.token);
      setUser(resJson.data!.user);
      toast.success("Logged in successfully");
      router.push("/");
    } else {
      toast.error("Failed to login", { description: resJson.error });
    }
  };
  return (
    <section className="container grow flex justify-center items-center">
      <Card className="mx-auto max-w-sm w-1/2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("password")}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          Not a member? {"  "}
          <Link href="/auth/signup" className="underline">
            Sign Up
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}

export default LoginPage;
