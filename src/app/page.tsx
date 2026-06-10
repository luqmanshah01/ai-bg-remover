"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import ImagePreview from "@/components/ImagePreview";
import LoadingSpinner from "@/components/LoadingSpinner";
import type { UploadStatus } from "@/types";

export default function Home() {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File, previewUrl: string) => {
    setOriginalUrl(previewUrl);
    setResultUrl(null);
    setError(null);
    setStatus("uploading");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/remove-background", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Failed to process image.");
      }

      setResultUrl(data.resultUrl);
      setStatus("success");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setOriginalUrl(null);
    setResultUrl(null);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            AI-Powered
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            Background Remover
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Upload any image and our AI will remove the background instantly — free, fast, and clean.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-purple-100 p-6 sm:p-10">
          {status === "success" && originalUrl && resultUrl ? (
            <div className="space-y-6">
              <ImagePreview original={originalUrl} result={resultUrl} />
              <div className="flex justify-center">
                <button
                  onClick={handleReset}
                  className="text-sm text-gray-400 hover:text-purple-600 underline transition-colors"
                >
                  Process another image
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <ImageUploader
                onUpload={handleUpload}
                disabled={status === "uploading"}
              />

              {status === "uploading" && (
                <div className="flex justify-center py-4">
                  <LoadingSpinner />
                </div>
              )}

              {status === "error" && error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 text-center">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Powered by remove.bg API · Images are never stored
        </p>
      </div>
    </main>
  );
}
