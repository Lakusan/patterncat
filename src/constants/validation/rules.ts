export const COMMON_PASSWORDS: string[] = [
  "123456",
  "123456789",
  "password",
  "qwerty",
  "letmein",
  "abc123",
  "111111",
];

export const PASSWORD_PATTERNS = /(1234|abcd|qwerty|password)/i;

export const PASSWORD_COMPLEXITY_RULES = {
  lower: /[a-z]/,
  upper: /[A-Z]/,
  number: /[0-9]/,
  special: /[^A-Za-z0-9]/,
} as const;
