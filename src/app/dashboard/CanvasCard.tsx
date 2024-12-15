"use client";
import { useAuth } from "@/components/context/AuthContext";
import ConfimationDialog from "@/components/elements/ConfirmationDialog";
import { Canvas } from "@/components/models/Canvas";
import { Card } from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuContent,
} from "@/components/ui/context-menu";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BaseResponse } from "../interface";
import { toast } from "sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Trash } from "lucide-react";

interface CanvasCardProps {
  canvas: Canvas;
  refreshCanvases: () => void;
}

const CanvasCard: React.FC<CanvasCardProps> = ({ canvas, refreshCanvases }) => {
  const [isConfirmDialogOpen, setConfirmDialogOpen] = React.useState(false);

  const { getAccessToken } = useAuth();

  const handleDeleteCanvas = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/canvas/${canvas.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const resJson = (await response.json()) as BaseResponse<String>;
      toast.error(resJson.message);
      return;
    }

    setConfirmDialogOpen(false);
    refreshCanvases();
  };

  return (
    <>
      {isConfirmDialogOpen && (
        <ConfimationDialog
          title="Delete Note?"
          message="Are you sure you want to delete this note? This cannot be undone!"
          confirmText="Delete"
          onConfirm={handleDeleteCanvas}
          onCancel={() => setConfirmDialogOpen(false)}
          setConfirmDialogOpen={setConfirmDialogOpen}
        />
      )}
      <ContextMenu>
        <ContextMenuTrigger>
          <Card>
            <Link href={"/canvas/" + canvas.address}>
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
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            className="w-full flex justify-between bg-red-500 text-white focus:bg-red-600 focus:text-white"
            onClick={() => {
              setConfirmDialogOpen(true);
            }}
          >
            <span>Delete</span>
            <Trash />
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
};

export default CanvasCard;
