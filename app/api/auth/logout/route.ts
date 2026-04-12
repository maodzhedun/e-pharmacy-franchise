//app/api/auth/logout/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND = process.env.BACKEND_URL || "http://localhost:3001";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (token) {
      await fetch(`${BACKEND}/api/user/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    cookieStore.delete("accessToken");
    return NextResponse.json({ success: true });
  } catch {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    return NextResponse.json({ success: true });
  }
}
