"use client";

import { useCallback, useState } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  onUpload: (file: File, previewUrl: string) => void;
  disabled?: boolean;
}

export default function ImageUploader({ onUpload, disabled }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const MAX_SIZE = 10 * 1024 * 1024;

  const validateAndSet = useCallback(
    (file: File) => {
      setError(null);

      if (!ALLOWED_TYPES.includes(file.type)) {
        setError("Invalid file type. Please upload a JPG, PNG, or WebP image.");
        return;
      }
      if (file.size > MAX_SIZE) {
        setError("File too large. Maximum size is 10MB.");
        return;
      }

      const url = URL.createObjectURL(file);
      setPreview(url);
      onUpload(file, url);
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files?.[0];
      if (file) validateAndSet(file);
    },
    [validateAndSet]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSet(file);
  };

  return (
    <div className="w-full space-y-3">
      <label
        htmlFor="file-upload"
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`
          relative flex flex-col items-center justify-center w-full h-64 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200
          ${dragActive ? "border-purple-500 bg-purple-50" : "border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-50/50"}
          ${disabled ? "opacity-50 pointer-events-none" : ""}
          ${preview ? "h-72" : ""}
        `}
      >
        {preview ? (
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image src={preview} alt="Preview" fill className="object-contain p-4" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-2xl">
              <p className="text-white text-sm font-medium">Click to change image</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-center px-6">
            <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
              <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-700">
                Drag & drop your image here
              </p>
              <p className="text-sm text-gray-400 mt-1">
                or <span className="text-purple-600 underline">browse file</span>
              </p>
            </div>
            <p className="text-xs text-gray-400">JPG, PNG, WebP — max 10MB</p>
          </div>
        )}

        <input
          id="file-upload"
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          className="hidden"
          onChange={handleChange}
          disabled={disabled}
        />
      </label>

      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}
    </div>
  );
}
