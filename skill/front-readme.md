# Front README Skill (Reverse-Engineered from README.md)

## Purpose
Write and maintain a clear, production-ready `README.md` for this frontend codebase.
Use this skill when creating a new README, updating project docs after architecture changes, or fixing inconsistencies between implementation and documentation.

## Core Rule
Keep README statements consistent with real code and configuration files (`package.json`, `src/` structure, env usage, deployment target).

## Recommended README Structure
Use this section order:

1. Project title and one-paragraph summary
2. Overview (problem solved + target users)
3. Tech stack
4. Main features
5. Installation and local setup
6. Project structure (FSD)
7. API/backend integration
8. Deployment
9. Screenshots (optional)
10. Contributing
11. Author
12. License

## Reverse-Engineered Baseline (Current Project)
Use these facts as baseline unless code changes:

- Frontend framework: Next.js 15 + React 19 + TypeScript
- Data layer: React Query
- Styling: TailwindCSS
- UI libs used in code: MUI DataGrid, Flowbite React
- Calendar: FullCalendar
- HTTP client: Axios through shared API client
- Tests: Jest + Testing Library
- Architecture: FSD-style split into `pages`, `features`, `entities`, `widgets`, `shared`
- Environment variable used for API base URL: `NEXT_PUBLIC_API_URL`

## Installation Section Pattern
Use copy-paste-ready command blocks. Prefer the package manager adopted by the project docs.

Example (Yarn):

```bash
git clone <repo-url>
cd <project-folder>
yarn install
cp .env.example .env.local
# edit .env.local
yarn dev
```

If no `.env.example` exists, explicitly say which variable is required and show a minimal example.

## Structure Section Pattern
Describe the FSD folders with one-line responsibilities:

- `src/pages`: Next.js routes
- `src/features`: feature slices (UI + business flows)
- `src/entities`: domain types and contracts
- `src/widgets`: composed UI blocks and layouts
- `src/shared`: reusable API, UI, and utilities

Avoid long ASCII trees if they become stale quickly; prefer concise bullet explanations.

## Consistency Checks Before Finalizing README
Run these checks mentally (or by reading files) before saving:

1. Backend description is unique and not contradictory across sections.
2. Install commands match the chosen package manager across the file.
3. Stack listed in README matches `package.json` dependencies.
4. Folder structure matches real directories under `src/`.
5. Env variable names match code usage and `.env` conventions.
6. Deployment URL is valid and current.

## Known Risk Found in Current README
The current README contains a backend inconsistency:

- One section says the frontend consumes a `.NET` API.
- Another section says it integrates with `Node.js + Express + Prisma + PostgreSQL`.

When editing README, keep only one backend statement that matches the real backend contract.

## Writing Style Rules
- Keep language objective and developer-focused.
- Prefer short sections with practical commands.
- Avoid marketing-heavy text in technical sections.
- Keep examples executable without extra interpretation.

## Update Workflow
1. Read `README.md`.
2. Compare claims against `package.json` and key folders.
3. Fix inconsistencies and outdated commands.
4. Keep section order stable for onboarding readability.
5. Re-check environment setup instructions end-to-end.
