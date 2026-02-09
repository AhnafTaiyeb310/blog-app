import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = process.env.DJANGO_URL || "http://127.0.0.1:8000";

export async function GET(req) {
    const cookieStore = await cookies();
    const access = cookieStore.get("access")?.value;

    if(!access)
        return NextResponse.json({detail: "Not Authenticated"}, {status: 401})

    const res = await fetch(`${BASE_URL}auth/users/me`, {
        headers: {
            Authorization: `JWT ${access}`
        },
    })

    const data = await res.json();
    return NextResponse.json(data, {status: res.status});
}