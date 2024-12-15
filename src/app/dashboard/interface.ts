import { Canvas } from "@/components/models/Canvas";
import { BaseResponse } from "../interface";

export type GetCanvasesResponse = BaseResponse<Canvas[]>;

export type CanvasBackground = {
  type: string;
  url: string;
  name: string;
  primary_text_color: string;
  primary_color_as_rgb: string;
};

export type CreateCanvasRequest = {
  title: string;
  background: string;
}