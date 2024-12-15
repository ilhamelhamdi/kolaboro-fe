"use client";

import { useAuth } from "@/components/context/AuthContext";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { GetCanvasesResponse } from "./interface";
import { toast } from "sonner";
import { Canvas } from "@/components/models/Canvas";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

function DashboardPage() {
  const [canvases, setCanvases] = React.useState<Canvas[]>([]);

  const { getAccessToken } = useAuth();

  const getCanvases = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/canvas`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
    });

    const resJson = (await response.json()) as GetCanvasesResponse;
    if (!response.ok || resJson.status === "error") {
      toast.error(resJson.message);
      return;
    }

    console.log(resJson.data);
    setCanvases(resJson.data!);
  };

  useEffect(() => {
    getCanvases();
  }, []);

  return (
    <section className="container mx-auto py-4">
      <h1 className="font-bold text-3xl">My Canvas</h1>
      <div className="mt-4 flex">
        {canvases.map((canvas) => (
          <div key={canvas.id} className="w-1/4 p-2">
            <Card>
              <Link href={'/canvas/'+canvas.address}>
                <div className="p-2">
                  <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl">
                    <Image
                      src={canvas.background}
                      alt="something"
                      width={400}
                      height={400}
                      className="w-full"
                    />
                  </AspectRatio>
                </div>
                <div className="p-2 pt-0 flex flex-col">
                  <h2 className="text-lg font-semibold">{canvas.title}</h2>
                  <p className="text-gray-500">{canvas.owner.displayName}</p>
                </div>
              </Link>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DashboardPage;
