import jwt from "jsonwebtoken";

const SECRET = process.env.SECRETE || "changeme";

export function signJwt(data: object) {
  return jwt.sign(data, SECRET);
}

export function verifyJwt<T>(data: string) {
  return jwt.verify(data, SECRET) as T;
}
