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
    ".{8}", // min length
  ].join("")}`
);

export const isPasswordRequirements = "minimum 8 letters, one uppercase, one lowercase, and one number.";

export const isPassword = (subject: string) => isPasswordRegex.test(subject);
