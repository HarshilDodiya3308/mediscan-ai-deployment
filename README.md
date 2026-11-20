# MediScan AI research prototype

A responsive frontend prototype for a medical-imaging research workspace. It includes an overview, three model-module screens, local image input validation, an analysis-history empty state, and light/dark themes.

> **Research use only.** This project is a UI prototype, not a medical device. It has no backend, database, trained model weights, authentication, or live inference. It never produces diagnostic predictions. Selected images are held only in the current browser session and are not sent or saved.

## Run in VS Code

1. Install [Node.js 20.9 or newer](https://nodejs.org/) and [Visual Studio Code](https://code.visualstudio.com/).
2. Extract the ZIP and open the extracted `mediscan-ai-prototype` folder in VS Code.
3. In VS Code, open **Terminal → New Terminal**.
4. Run `npm install` once to install project dependencies.
5. Run `npm run dev` to start the local app.
6. Open the URL printed in the terminal (usually `http://localhost:3000`).

To make a production build, run `npm run build`.

## Project stack

- Next.js App Router, React, and TypeScript
- Tailwind CSS 4 with custom responsive theme styles
- Lucide React icons

## Project structure

- `app/` — app route, metadata, and global theme/styles
- `components/mediscan-dashboard.tsx` — dashboard and module interactions
- `public/` — app icons and static assets
- `package.json` and `pnpm-lock.yaml` — dependencies and scripts

This ZIP intentionally excludes installed dependencies, generated build output, Git metadata, and environment files. Install dependencies after extracting it. No secrets or API credentials are included.
