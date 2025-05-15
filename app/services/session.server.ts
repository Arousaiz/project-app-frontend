import { createCookieSessionStorage, data, redirect } from "react-router";
import { ProfileService } from "~/api/api.profile";

type SessionData = {
  token: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",

      // all of these are optional
      // Expires can also be set (although maxAge overrides it when used in combination).
      // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
      //
      // expires: new Date(Date.now() + 60_000),
      httpOnly: true,
      maxAge: 60 * 60,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: process.env.NODE_ENV == "production",
    },
  });

async function requireAuthCookie(request: Request): Promise<string> {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("token")) {
    return session.get("token")!;
  } else {
    throw redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
}

async function redirectFromAuth(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("token")) {
    throw redirect("/");
  } else {
    return data(
      { error: session.get("error") },
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      }
    );
  }
}

async function getToken(request: Request): Promise<string | null> {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("token")) {
    const token = session.get("token");
    if (token) {
      return token;
    }
  }
  return null;
}

async function fetchUser(request: Request) {
  const token = await getToken(request);
  if (token !== null) {
    const user = await ProfileService.fetchProfile(token).catch((err) => {});
    return user;
  }
  return null;
}

export {
  getSession,
  commitSession,
  destroySession,
  requireAuthCookie,
  redirectFromAuth,
  getToken,
  fetchUser,
};
