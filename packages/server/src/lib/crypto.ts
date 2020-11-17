import crypto from "crypto"
import expressJwt from "express-jwt"
import jwt from "jsonwebtoken"

const salt = '551ae75784b425427b561e4acfebd82b' //crypto.randomBytes(16).toString("hex")
const secret = 'shhhhhhared-secret'

export async function hash(password: string): Promise<string> {
  assertPasswordStrength(password);
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err)
      resolve(derivedKey.toString("hex"))
    })
  })
}

export async function verify(password: string, hashToCheck: string): Promise<boolean> {
  const hashExpected = await hash(password);
  return hashToCheck === hashExpected
}

export function tokenize(obj: Record<string, any>) {
  return jwt.sign(obj, secret, { expiresIn: '1d' })
}

export const jwtMiddleware = expressJwt({
  secret,
  // requestProperty: "auth",
  algorithms: ["HS256"],
  credentialsRequired: false,
  // getToken: (req) => req.cookies.auth,
});

/**
 ^                         Start anchor
 (?=.*[A-Z].*[A-Z])        Ensure string has two uppercase letters.
 (?=.*[!@#$&*])            Ensure string has one special case letter.
 (?=.*[0-9].*[0-9])        Ensure string has two digits.
 (?=.*[a-z].*[a-z].*[a-z]) Ensure string has three lowercase letters.
 .{8}                      Ensure string is of length 8.
 */
export const isPasswordRegex = new RegExp(
  `^${[
    "(?=.*[A-Z])", // one uppercase
    "(?=.*[a-z])", // one lowercase
    "(?=.*[0-9])", // one number
    ".{8}" // min length
  ].join("")}`
)

export const isPasswordRequirements = "minimum 8 letters, one uppercase, one lowercase, and one number."

export function isPassword (subject: string) {
  return isPasswordRegex.test(subject)
}

export function assertPasswordStrength (password: string) {
  if (!isPassword(password)) throw new Error(isPasswordRequirements);
  return password;
}

