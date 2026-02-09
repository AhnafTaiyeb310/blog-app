import { NextResponse } from "next/server";

const BASE_URL = process.env.DJANGO_URL || "http://127.0.0.1:8000";

export async function POST(req) {
    const body = await req.json();

    const res = await fetch(`${BASE_URL}auth/jwt/create/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    });

    // const contentType = res.headers.get("content-type");
    // if (contentType && contentType.includes("text/html")) {
    //     const htmlError = await res.text();
    //     console.error("DJANGO HTML ERROR DETECTED:", htmlError.slice(0, 500));
    //     return NextResponse.json({ detail: "Backend returned an HTML error. Check server logs." }, { status: 500 });
    // }

    const data = await res.json();

    if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("access", data.access, {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // true in production (HTTPS)
    path: "/",
    });

    response.cookies.set("refresh", data.refresh, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    });

    return response;
}