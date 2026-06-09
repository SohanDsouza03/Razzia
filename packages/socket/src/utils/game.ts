import type { Socket } from "@razzia/common/types/game/socket"
import Game from "@razzia/socket/services/game"
import Registry from "@razzia/socket/services/registry"
import { nanoid } from "nanoid"

/**
 * Resolves the game for the given id and invokes `callback` with it.
 *
 * Emits a `game:errorMessage` event to the socket when the id is missing or no
 * matching game exists. Rejections from an async `callback` are caught and
 * logged so they never surface as unhandled promise rejections.
 */
export const withGame = (
  gameId: string | undefined,
  socket: Socket,
  callback: (_game: Game) => void | Promise<void>,
): void => {
  if (!gameId) {
    socket.emit("game:errorMessage", "errors:game.notFound")

    return
  }

  const registry = Registry.getInstance()
  const game = registry.getGameById(gameId)

  if (!game) {
    socket.emit("game:errorMessage", "errors:game.notFound")

    return
  }

  void Promise.resolve(callback(game)).catch((error: unknown) => {
    console.error(`Error while handling game ${gameId}:`, error)
  })
}

/**
 * Generates a random numeric invite code players use to join a game.
 *
 * @param length - Number of digits in the code (defaults to 6).
 */
export const createInviteCode = (length = 6) => {
  let result = ""
  const characters = "0123456789"
  const charactersLength = characters.length

  for (let i = 0; i < length; i += 1) {
    const randomIndex = Math.floor(Math.random() * charactersLength)
    result += characters.charAt(randomIndex)
  }

  return result
}

/**
 * Builds a filesystem-safe, collision-resistant file name from a quiz subject.
 *
 * The subject is slugified (accents stripped, lowercased, non-alphanumeric
 * characters removed and truncated) and suffixed with a short unique id.
 */
export const normalizeFilename = (subject: string) => {
  const slug = subject
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/gu, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/gu, "-")
    .replace(/[^a-z0-9-]/gu, "")
    .slice(0, 10)

  const shortId = nanoid(8)

  return `${slug}-${shortId}`
}

const MAX_POINTS = 1000

export const orderToPoint = (index: number, totalPlayers: number): number => {
  if (totalPlayers <= 1) {
    return MAX_POINTS
  }

  return Math.round(
    MAX_POINTS - (index / (totalPlayers - 1)) * (MAX_POINTS / 2),
  )
}

/**
 * Computes the score for an answer based on how quickly it was submitted.
 *
 * Starts from MAX_POINTS and decreases linearly over the question duration,
 * never dropping below 0.
 *
 * @param startTime - Timestamp (ms) when the question was opened for answers.
 * @param secondes - Total time allowed to answer, in seconds.
 */
export const timeToPoint = (startTime: number, secondes: number): number => {
  let points = MAX_POINTS

  const actualTime = Date.now()
  const tempsPasseEnSecondes = (actualTime - startTime) / 1000

  points -= (MAX_POINTS / secondes) * tempsPasseEnSecondes
  points = Math.max(0, points)

  return points
}
