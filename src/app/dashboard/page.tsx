"use client";

import { useAuth } from "@/components/context/AuthContext";
import React, { useEffect } from "react";
import { CanvasBackground, CreateCanvasRequest, GetCanvasesResponse } from "./interface";
import { toast } from "sonner";
import { Canvas } from "@/components/models/Canvas";
import { useRouter } from "next/navigation";
import { BaseResponse } from "../interface";
import DashboardNavbar from "./DashboardNavbar";
import CanvasCard from "./CanvasCard";
import ConfimationDialog from "@/components/elements/ConfirmationDialog";

function DashboardPage() {
  const [canvases, setCanvases] = React.useState<Canvas[]>([]);

  const { getAccessToken, user, logout } = useAuth();

  const router = useRouter();

  const getCanvases = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/canvas`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 401) logout();
      const resJson = (await response.json()) as BaseResponse<String>;
      toast.error(resJson.message);
      return;
    }
    const resJson = (await response.json()) as GetCanvasesResponse;

    setCanvases(resJson.data!);
  };

  const getRandomBackground = async () => {
    const response = await fetch(`api/canvas-background/random`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resJson = (await response.json()) as CanvasBackground;
    return resJson;
  };

  const handleCreateCanvas = async () => {
    const background = await getRandomBackground();
    const reqBody: CreateCanvasRequest = {
      title: "Untitled",
      background: background.url,
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/canvas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify(reqBody),
    });

    const resJson = (await response.json()) as BaseResponse<Canvas>;
    if (!response.ok || resJson.status === "error") {
      toast.error(resJson.message);
      return;
    }

    setCanvases([...canvases, resJson.data!]);
    router.push("/canvas/" + resJson.data!.address);
  };

  useEffect(() => {
    getCanvases();
  }, []);

  return (
    <main className="w-screen min-h-screen">
      <DashboardNavbar onCreateCanvas={handleCreateCanvas} />
      <section className="container mx-auto py-4">
        <h1 className="font-bold text-3xl">My Canvas</h1>
        <div className="mt-4 flex flex-wrap">
          {canvases.map((canvas) => (
            <div key={canvas.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
              <CanvasCard canvas={canvas} refreshCanvases={getCanvases} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
