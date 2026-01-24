// app/api/og/route.ts
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

// Define the response type for better type safety
export async function GET(request: NextRequest): Promise<ImageResponse> {
  const html = `
    <div style="
      font-size: 40px;
      background: white;
      width: 100%;
      height: 100%;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      padding: 0 20px;
    ">
      MenuGen - AI-Powered Menu Generator
    </div>
  `;

  return new ImageResponse(html, {
    ...size,
  });
}
