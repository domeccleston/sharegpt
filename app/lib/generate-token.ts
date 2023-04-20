import { sign, Secret, SignOptions } from "jsonwebtoken";

export function generateToken(
  payload: string | object | Buffer,
  secret: Secret,
  options?: SignOptions | undefined
): string {
  return sign(payload, secret, options);
}
