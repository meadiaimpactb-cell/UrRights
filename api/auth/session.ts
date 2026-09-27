import * as jose from "jose";
import { env } from "../lib/env";

const JWT_ALG = "HS256";

export type SessionPayload = {
  /** users.id */
  sub: number;
};

export async function signSessionToken(userId: number): Promise<string> {
  const secret = new TextEncoder().encode(env.appSecret);
  return new jose.SignJWT({})
    .setProtectedHeader({ alg: JWT_ALG })
    .setSubject(String(userId))
    .setIssuedAt()
    .setExpirationTime("1 year")
    .sign(secret);
}

export async function verifySessionToken(
  token: string,
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(env.appSecret);
    const { payload } = await jose.jwtVerify(token, secret, {
      algorithms: [JWT_ALG],
    });
    const sub = Number(payload.sub);
    if (!Number.isInteger(sub) || sub <= 0) return null;
    return { sub };
  } catch (error) {
    console.warn("[session] JWT verification failed:", error);
    return null;
  }
}
