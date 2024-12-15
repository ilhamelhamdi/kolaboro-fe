import { BaseResponse } from "@/app/interface";
import { User } from "@/components/context/AuthContext/interface";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponseData {
  token: string;
  user: User;
}

export type LoginResponse = BaseResponse<LoginResponseData>