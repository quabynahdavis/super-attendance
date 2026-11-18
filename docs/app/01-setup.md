# Setup

## Prerequisites

- Bun
- A Rust toolchain suitable for Tauri 2 (needed for native builds)
- Platform dependencies for Tauri on your OS

## Install

From the git root (`app/`):

```bash
bun install
```

This uses `bun.lock`. There is no `package-lock.json`, `yarn.lock`, or `pnpm-lock.yaml`.

## Scripts

`package.json` defines:

- `dev` — Vite frontend only
- `build` — typecheck with `vue-tsc`, then Vite production build
- `preview` — Vite preview of the built frontend
- `tauri` — Tauri CLI entry (`@tauri-apps/cli`)

## Run the desktop app

Development window:

```bash
bun run tauri dev
```

Production build:

```bash
bun run tauri build
```

You can also call the CLI through the package script:

```bash
bun run tauri
```

Tauri config (`src-tauri/tauri.conf.json`) runs `bun run dev` before dev and `bun run build` before release builds. The product identifier is `com.attendance.app`.

## Out of scope for this client

Connecting to the Go server, wiring Kotlin sensors, and implementing attendance flows are not part of this setup guide.
