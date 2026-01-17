import { PASSWORD_COMPLEXITY_COUNT, PASSWORD_LIMITS } from "@/src/constants/validation/limits";
import { COMMON_PASSWORDS, PASSWORD_COMPLEXITY_RULES, PASSWORD_PATTERNS } from "@/src/constants/validation/rules";

export function checkPasswordRules(password: string) {
  const lower = PASSWORD_COMPLEXITY_RULES.lower.test(password);
  const upper = PASSWORD_COMPLEXITY_RULES.upper.test(password);
  const number = PASSWORD_COMPLEXITY_RULES.number.test(password);
  const special = PASSWORD_COMPLEXITY_RULES.special.test(password);

  const complexityCount = [lower, upper, number, special].filter(Boolean).length;

  return {
    length: password.length >= PASSWORD_LIMITS.MIN_LENGTH,
    maxLength: password.length <= PASSWORD_LIMITS.MAX_LENGTH,
    lower,
    upper,
    number,
    special,
    complexity: complexityCount >= PASSWORD_COMPLEXITY_COUNT,
    common: !COMMON_PASSWORDS.includes(password.toLowerCase()),
    pattern: !PASSWORD_PATTERNS.test(password),
  };
}
