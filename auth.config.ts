import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnApplication = nextUrl.pathname.startsWith("/main");
      if (isOnApplication) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/main", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
