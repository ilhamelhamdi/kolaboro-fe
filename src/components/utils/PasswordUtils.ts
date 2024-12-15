import { hash } from "bcrypt-ts";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await getSalt();
  return hash(password, salt);
}

const getSalt = async () => {
  return process.env.NEXT_PUBLIC_SALT_HASH || '$2a$10$Q2HFlgmwvQXi64qrjxzzvu';
}