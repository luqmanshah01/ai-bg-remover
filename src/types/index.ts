export type UploadStatus = "idle" | "uploading" | "success" | "error";

export interface ProcessResult {
  resultUrl: string;
}

export interface ApiErrorResponse {
  error: string;
}
