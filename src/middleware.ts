import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
 
export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
	const url = new URL(request.url);
	const pathname = url.pathname;

	const isDashboardRoute = pathname.startsWith("/dashboard");
	const isAuthRoute = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

	// For dashboard routes, redirect to sign-in if not logged in
	if (isDashboardRoute && !sessionCookie) {
		return NextResponse.redirect(new URL("/sign-in", request.url));
	}

	// For auth routes, redirect to dashboard if already logged in
	if (isAuthRoute && sessionCookie) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}
 
	return NextResponse.next();
}
 
export const config = {
	matcher: [
		// Exclude API routes, static files, images etc.
		"/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|webm|mp4)).*)"
	],
};