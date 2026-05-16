# Front Base Project Template (Reverse-Engineered from package.json)

## Goal
Set up a base frontend project aligned with the current repository stack and conventions.

## 1) Prerequisites
- Node.js 20+
- Yarn 1.x+
- Git

## 2) Create the Project
Use Next.js with TypeScript:

```bash
yarn create next-app my-front-base --typescript
cd my-front-base
```

## 3) Install Runtime Dependencies
Install the same core dependencies used by this codebase:

```bash
yarn add next@15.2.1 react@19.0.0 react-dom@19.0.0 \
  @tanstack/react-query@^5.67.2 axios@^1.8.2 \
  react-hook-form@^7.63.0 yup@^1.6.1 \
  tailwindcss@^3.0.0 postcss@^8.4 autoprefixer@^10 \
  @mui/material@^7.3.1 @emotion/react@^11.14.0 @emotion/styled@^11.14.1 @mui/x-data-grid@^8.10.2 \
  flowbite-react@^0.10.2 \
  @fullcalendar/core@6.1.14 @fullcalendar/react@6.1.14 @fullcalendar/daygrid@6.1.14 @fullcalendar/interaction@6.1.14 @fullcalendar/list@6.1.15 @fullcalendar/timegrid@6.1.15 \
  react-toastify@^11.0.5 react-icons@^5.5.0 react-number-format@^5.4.4
```

## 4) Install Dev Dependencies
Install testing, linting, and TypeScript tooling:

```bash
yarn add -D typescript@^5 @types/node@^20 @types/react@^19 @types/react-dom@^19 \
  eslint@^9 eslint-config-next@15.2.1 @eslint/eslintrc@^3 \
  jest@^30.2.0 jest-environment-jsdom@^30.2.0 @types/jest@^30.0.0 \
  @testing-library/react@14 @testing-library/dom@^10.4.1 @testing-library/jest-dom@6 @testing-library/user-event@14 \
  babel-jest@^30.2.0 @babel/core@^7.28.4 @babel/preset-env@^7.28.3 @babel/preset-react@^7.27.1 @babel/preset-typescript@^7.27.1 \
  ts-jest@^29.4.5 ts-node@^10.9.2
```

## 5) Add Scripts in package.json
Use this scripts block:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest"
  }
}
```

## 6) Create Base Folder Structure (FSD)
Create the same architecture style used in this project:

```bash
mkdir -p src/{pages,features,entities,widgets,shared}
mkdir -p src/shared/{api,lib,ui,assets,test}
mkdir -p src/shared/api/errors
```

Recommended internal structure per feature:

```text
src/features/<feature>/
  api/
  model/
  ui/
  lib/
  test/
```

## 7) Wire Core Shared Modules
Create these minimum shared files:

- `src/shared/api/client.ts` for Axios instance
- `src/shared/api/queryClient.ts` for React Query client
- `src/shared/api/types.ts` for API response contracts
- `src/pages/_app.tsx` to provide React Query and global styles

## 8) Configure Tailwind
Initialize and configure Tailwind + PostCSS:

```bash
yarn tailwindcss init -p
```

Set `content` paths to include `src/pages`, `src/features`, `src/widgets`, `src/shared`, and `src/entities`.

## 9) Configure Testing
Create:

- `jest.config.ts`
- `jest.setup.ts`
- `babel.config.js`

Start by testing hooks and critical utilities. Mock feature API modules in hook tests.

## 10) Run the Project

```bash
yarn dev
yarn test
yarn lint
```

## 11) Engineering Rules to Keep
Apply these rules from this codebase:

- Keep HTTP calls out of components.
- Use `src/shared/api/client` in feature API modules.
- Keep feature API code in `src/features/*/api`.
- Use React Query hooks in `src/features/*/model`.
- Prefer functional components.
- Use default export only for Next.js pages.
- Prefer named exports elsewhere.
- Avoid `console.log` in committed code.

## 12) Optional Modules from Current Stack
Install only if the project needs them:

- Charts: `apexcharts`, `react-apexcharts`
- Rich text: `@tinymce/tinymce-react`, `react-quill`, `@tiptap/react`, `@tiptap/starter-kit`
- Tables: `@tanstack/react-table`
- Maps: `google-map-react`

This keeps the base template lean while preserving compatibility with the current architecture.
