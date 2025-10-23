import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ['/dashboard', '/perfil']

export function middleware(req: NextRequest) {
    const token = req.cookies.get('sessionId')?.value

    if(protectedRoutes.some(path => req.nextUrl.pathname.startsWith(path))) {
        if(!token) {
            return NextResponse.redirect(new URL('/login', req.url))
        }
    }

    return NextResponse.next()

}
export const config = {
    matcher:['/dashboard/:path*', '/perfil/:path*']
}