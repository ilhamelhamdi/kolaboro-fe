"use client";
import React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Popover } from "@/components/ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="px-10 py-4 border-b flex justify-between">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href={"/"}>
              <h1 className="font-bold text-xl px-4">Kolaboro</h1>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle() + " text-lg"}>
                Join
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle() + " text-lg"}>
                Make+
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button>{user.display_name}</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Card>
              <CardHeader>
                <CardTitle>{user.display_name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={logout}>Logout</Button>
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}

export default Navbar;
