import { compare } from "bcryptjs";

export async function verifyPassword(password: string, hash: string) {
  return compare(password, hash);
}
