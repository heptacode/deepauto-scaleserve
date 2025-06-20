# DeepAuto.ai Scaleserve Demo

## Getting Started

### Requirements

- **NVM**
- **Node.js** ≥ 18 LTS
- **pnpm** ≥ 10.x

### Installation

> ⚡ Run this script for fastest setup.

```bash
./scripts/setup.sh
```

This setup script includes the following steps.

1. Install nvm if not installed
2. Install required Node.js version
3. Enable corepack and install pnpm
4. Install project dependencies

### Preview Live Demo

> ✨ This will run a live demo server for both frontend & backend.

```bash
pnpm preview
```

- Frontend: http://localhost:4173
- Backend: http://localhost:3000

### Development

> 🔧 This will run a hot reload server for local development.

```bash
pnpm dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Build

> 🌐 This will build the app for production.

```bash
pnpm build
```

---

## Project Details

### Tech Stack

| Category              |  Library/Tool           |  Reason for selection                                                                                             |
| --------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Monorepo**          | `pnpm workspace`        | Faster installations, efficient dependency management, and strict resolution                                      |
| **Routing**           | `react-router-dom`      | To identify each chat by its `chatId` in the path param                                                           |
| **Data Fetching**     | `@tanstack/react-query` | Provides caching, deduplication, retries, and query invalidation, minimizing the need for manual state management |
| **Global State Mgmt** | `zustand`               | Minimal boilerplate code, low learning curve, and high maintainability and readability                            |
| **Styling**           | `tailwindcss`           | Allows for a fast start and makes it easy to follow the design guidelines                                         |

### Directory Structure

```
deepauto-scaleserve
├── backend               # Backend code
├── frontend              # Frontend code
│   ├── src
│   │   ├── components  # Reusable components
│   │   ├── hooks       # Reusable hooks
│   │   ├── pages       # Page components
│   │   ├── remotes     # Collection of REST endpoints
│   │   ├── stores      # Global zustand stores
├── pnpm-workspace.yaml   # pnpm workspace configuration
├── scripts
└── shared                # Shared resources
```
