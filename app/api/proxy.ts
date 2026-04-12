//app/api/proxy.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND = process.env.BACKEND_URL || "http://localhost:3001";

export async function proxyToBackend(req: NextRequest, path: string) {
  const url = `${BACKEND}/api${path}`;
  const headers = new Headers();

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const contentType = req.headers.get("content-type") || "";

  let body: any = undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    if (contentType.includes("multipart/form-data")) {
      body = await req.arrayBuffer();
      headers.set("content-type", contentType);
    } else {
      body = await req.text();
      headers.set("content-type", "application/json");
    }
  }

  const backendRes = await fetch(url, { method: req.method, headers, body });

  const resHeaders = new Headers();
  backendRes.headers.forEach((value, key) => {
    if (key.toLowerCase() === "content-type") resHeaders.set(key, value);
  });

  const data = await backendRes.arrayBuffer();
  return new NextResponse(data, {
    status: backendRes.status,
    headers: resHeaders,
  });
}