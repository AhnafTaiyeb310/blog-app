import { NextResponse } from "next/server";

export function middleware(req){
    const access = req.cookies.get('access') 

    if(!access)
        return NextResponse.redirect(new URL("/login"), req.url);

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*"],
};