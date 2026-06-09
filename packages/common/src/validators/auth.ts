import z from "zod"

/** Validates a player username (between 4 and 20 characters). */
export const usernameValidator = z
  .string()
  .min(4, "errors:auth.usernameTooShort")
  .max(20, "errors:auth.usernameTooLong")

/** Validates a game invite code (exactly 6 characters). */
export const inviteCodeValidator = z
  .string()
  .length(6, "errors:auth.invalidInviteCode")
