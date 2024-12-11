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
import { SignUpFormValues, signUpSchema } from "./form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const { toast } = useToast();

  const onSubmit = async (data: SignUpFormValues) => {
    const reqBody = {
      email: data.email,
      username: data.username,
      display_name: data.displayName,
      password: data.password,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reqBody),
      }
    );

    if (response.ok) {
      toast({
        title: "Success",
        description: "Account created successfully",
      });
    } else {
      
      toast({
        title: "Failed",
        description: await response.json(),
      });
    }
  };

  return (
    <section className="container grow flex justify-center items-center">
      <Card className="mx-auto max-w-sm w-1/2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription></CardDescription>
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
                {errors.email && (
                  <small className="text-red">{errors.email.message}</small>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  required
                  {...register("username")}
                />
                {errors.username && (
                  <small className="text-red">{errors.username.message}</small>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="display-name">Display Name</Label>
                <Input
                  id="display-name"
                  type="text"
                  required
                  {...register("displayName")}
                />
                {errors.displayName && (
                  <small className="text-red">
                    {errors.displayName.message}
                  </small>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("password")}
                />
                {errors.displayName && (
                  <small className="text-red">
                    {errors.displayName.message}
                  </small>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-confirmation">
                  Password Confirmation
                </Label>
                <Input
                  id="password-confirmation"
                  type="password"
                  required
                  {...register("passwordConfirmation")}
                />
                {errors.passwordConfirmation && (
                  <small className="text-red">
                    {errors.passwordConfirmation.message}
                  </small>
                )}
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          Already have an account? {"  "}
          <Link href="/auth/login" className="underline">
            Login
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}

export default SignUpPage;
