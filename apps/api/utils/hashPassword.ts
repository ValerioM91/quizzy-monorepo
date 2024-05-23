import { randomBytes, scrypt as _scrypt } from "crypto"
import { promisify } from "util"

const scrypt = promisify(_scrypt)

export const hashPassword = async (password: string) => {
  const salt = randomBytes(8).toString("hex")
  const hash = (await scrypt(password, salt, 32)) as Buffer
  const result = salt + "." + hash.toString("hex")
  return result
}

export const comparePasswords = async (storedPassword: string, suppliedPassword: string) => {
  const [salt, storedHash] = storedPassword.split(".")
  const hash = (await scrypt(suppliedPassword, salt, 32)) as Buffer
  return storedHash === hash.toString("hex")
}
