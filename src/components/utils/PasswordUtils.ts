import { genSalt, hash } from "bcrypt-ts";


const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(saltRounds);
  return hash(password, salt);
}