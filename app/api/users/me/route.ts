//app/api/users/me/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND = process.env.BACKEND_URL || "http://localhost:3001";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const res = await fetch(`${BACKEND}/api/user/user-info`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok)
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: res.status },
      );
    return NextResponse.json(await res.json());
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
