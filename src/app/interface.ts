export interface BaseResponse<T> {
  status: "success" | "error";
  message: string;
  data: T | null;
  error: string | null;
}
