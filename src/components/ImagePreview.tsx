"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import BgColorPicker from "./BgColorPicker";
import DownloadButton from "./DownloadButton";

interface ImagePreviewProps {
  original: string;
  result: string;
}

export default function ImagePreview({ original, result }: ImagePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedBg, setSelectedBg] = useState<string | null>(null);
  const [compositedUrl, setCompositedUrl] = useState<string>(result);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (selectedBg) {
        ctx.fillStyle = selectedBg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      setCompositedUrl(canvas.toDataURL("image/png"));
    };
    img.src = result;
  }, [result, selectedBg]);

  return (
    <div className="w-full space-y-6">
      <canvas ref={canvasRef} className="hidden" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500 text-center">Original</p>
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
            <Image src={original} alt="Original" fill className="object-contain p-2" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500 text-center">Result</p>
          <div
            className="relative w-full aspect-square rounded-2xl overflow-hidden border border-gray-200"
            style={
              selectedBg
                ? { backgroundColor: selectedBg }
                : {
                    backgroundImage:
                      "linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)",
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                  }
            }
          >
            <Image src={compositedUrl} alt="Result" fill className="object-contain p-2" />
          </div>
        </div>
      </div>

      <BgColorPicker selected={selectedBg} onSelect={setSelectedBg} />

      <div className="flex justify-center">
        <DownloadButton imageUrl={compositedUrl} />
      </div>
    </div>
  );
}
