const REMOVE_BG_API_URL = "https://api.remove.bg/v1.0/removebg";

export async function removeBackground(imageBuffer: Buffer, filename: string): Promise<Buffer> {
  const formData = new FormData();
  const blob = new Blob([new Uint8Array(imageBuffer)], { type: "image/png" });
  formData.append("image_file", blob, filename);
  formData.append("size", "auto");

  const response = await fetch(REMOVE_BG_API_URL, {
    method: "POST",
    headers: {
      "X-Api-Key": process.env.REMOVE_BG_API_KEY!,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message = errorData?.errors?.[0]?.title ?? `remove.bg API error: ${response.status}`;
    throw new Error(message);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
