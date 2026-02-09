import { NextResponse } from "next/server";

const BASE_URL = process.env.DJANGO_URL;

export async function POST() {
    const response = NextResponse.json({success : true})

    response.cookies.delete("access");
    response.cookies.delete("refresh");

    return response;
}