# Copilot Instructions for AI Agents

## Project Overview

This is a modular, front-end focused codebase using Vite for builds. The structure is organized by feature and entity domains, with clear separation between UI, API, and model logic. The main entry point is `src/pages/main.js`, and HTML pages are under `src/pages/`.

## Architecture & Structure

- **Feature-based organization:**
  - `src/app/` contains providers, store, and global styles.
  - `src/entities/` and `src/features/` are split by domain (e.g., `auth`, `order`, `product`, `cart`).
  - UI components are in `src/shared/ui/` and feature-specific UI in their respective folders.
  - Widgets and reusable sections are in `src/widgets/`.
- **Data flow:**
  - API logic is under `api/` folders within entities/features.
  - Models are separated from UI and API logic.
  - Shared helpers (e.g., `format-price.js`, `debounce.js`) are in `src/shared/helpers/`.

## Developer Workflows

- **Build:** Use Vite (`vite.config.js`).
  - Typical build/start: `npm run dev` or `npm run build`.
- **No test or lint config detected.**
- **Debugging:**
  - Entry point: `src/pages/main.js`.
  - Styles: SCSS, with global tokens and mixins in `src/app/styles/`.

## Project-Specific Conventions

- **SCSS:**
  - Use global variables, mixins, and tokens from `src/app/styles/`.
  - Feature/component styles are colocated with JS/HTML files.
- **Component Patterns:**
  - UI components follow a flat structure in `src/shared/ui/`.
  - Feature-specific UI/components are under their respective folders.
- **API Integration:**
  - Supabase integration is in `src/shared/api/supabase/`.
  - API logic is always separated from UI and model code.

## Integration Points

- **External:**
  - Supabase (see `src/shared/api/supabase/`).
  - Vite for builds.
- **Internal:**
  - Cross-component communication via shared helpers and store (`src/app/store/`).

## Examples

- To add a new product feature:
  - Create UI in `src/features/product/ui/`.
  - Add API logic in `src/features/product/api/`.
  - Use shared helpers as needed.
- To update global styles:
  - Edit SCSS files in `src/app/styles/`.

## Key Files & Directories

- `src/pages/main.js` (entry point)
- `vite.config.js` (build config)
- `src/app/styles/` (global styles)
- `src/shared/helpers/` (utility functions)
- `src/shared/ui/` (reusable UI components)
- `src/entities/`, `src/features/`, `src/widgets/` (domain/feature logic)

---

_If any section is unclear or missing, please provide feedback for further refinement._
