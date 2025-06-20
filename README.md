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
