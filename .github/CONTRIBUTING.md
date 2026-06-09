# Contributing to Razzia

Thank you for your interest in contributing!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/Razzia.git`
3. Install dependencies from the repository root: `pnpm install`
4. Create a branch: `git checkout -b feat/your-feature-name`

## Project Structure

Razzia is a pnpm workspace monorepo. The source lives under `packages/`:

- `packages/common` — shared TypeScript types, constants and Zod validators used by both the server and the web client.
- `packages/socket` — the Socket.IO game server that runs the game loop and persists quizzes and results.
- `packages/web` — the React + Vite front-end (player and manager interfaces).

## Local Development

Run every package in watch mode from the repository root:

```bash
pnpm dev
```

You can also run a single package:

```bash
pnpm dev:web     # front-end only
pnpm dev:socket  # game server only
```

## Branch Naming

- `feat/` — new feature
- `fix/` — bug fix
- `chore/` — maintenance, dependencies
- `docs/` — documentation only

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add timer display to question screen
fix: prevent crash when quiz has no questions
chore: update dependencies
```

## Pull Requests

- **One PR = one feature or fix.** Do not bundle multiple features in a single PR — it becomes unmanageable to review and harder to revert if something breaks.
- Make sure the CI passes before requesting review
- Link any related issue with `Closes #123`

## Code Style

- Run `pnpm lint` and fix any errors before committing
- Run `pnpm format` to check formatting (`pnpm format:fix` applies it)
- Keep components small and focused
- No commented-out code

## Reporting Issues

Use the issue templates provided in this repository.
