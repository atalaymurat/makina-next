import { withIronSession } from "next-iron-session";

export default function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.APP_SESSION_SECRET,
    cookieName: process.env.APP_COOKIE_NAME,
    cookieOptions: {
      // the next line allows to use the session in non-https environements like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === "production",
    },
  });
}
