# Claude.md - Project Context for AI Assistants

## Project Overview

This is a **Backstage developer portal** - an open-source platform by Spotify for building developer portals. It serves as a single source of truth for infrastructure tooling, services, and documentation.

## Technology Stack

- **Runtime:** Node.js (v20 or v22)
- **Language:** TypeScript 5.8
- **Frontend:** React 18 + Material-UI v4
- **Backend:** Express.js (via Backstage backend-defaults)
- **Package Manager:** Yarn 4.4.1 (monorepo workspaces)
- **Database:** SQLite3 (dev) / PostgreSQL 17 (prod)
- **Testing:** Jest + Playwright
- **Containerization:** Docker + Docker Compose

## Project Structure

```
/
├── packages/
│   ├── app/                 # React frontend application
│   │   ├── src/
│   │   │   ├── App.tsx     # Main app with plugin routing
│   │   │   ├── components/ # UI components (Root, catalog, home, search)
│   │   │   └── apis.ts     # API integrations
│   │   └── e2e-tests/      # Playwright E2E tests
│   │
│   └── backend/            # Node.js/Express backend
│       └── src/index.ts    # Backend initialization
│
├── plugins/                 # Custom plugins directory
├── docker/                  # Docker configuration
├── examples/                # Example entities, templates, K8s RBAC
│
├── app-config.yaml          # Development config
├── app-config.production.yaml # Production config
└── catalog-info.yaml        # This repo's catalog entry
```

## Common Commands

```bash
# Development
yarn install          # Install dependencies
yarn start            # Start dev servers (frontend :3000, backend :7007)

# Building
yarn build:all        # Build frontend and backend
yarn build:backend    # Build backend only
yarn build-image      # Build Docker image

# Testing
yarn test             # Run unit tests
yarn test:all         # Run tests with coverage
yarn test:e2e         # Run Playwright E2E tests

# Code Quality
yarn lint             # Lint since origin/master
yarn lint:all         # Lint all packages
yarn prettier:check   # Check formatting
yarn tsc              # Type check all packages

# Other
yarn clean            # Clean build artifacts
yarn new              # Create new package/plugin
```

## Key Backstage Plugins

- **catalog** - Software catalog and entity discovery
- **api-docs** - API documentation
- **scaffolder** - Software templates/scaffolding
- **techdocs** - Technical documentation
- **search** - Global search (PostgreSQL backend)
- **kubernetes** - K8s cluster integration
- **org** - Organization management
- **home** - Customizable home page
- **tech-radar** - Technology radar visualization

## Frontend Routes

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/catalog` | Software catalog |
| `/catalog/:namespace/:kind/:name` | Entity detail page |
| `/tech-radar` | Technology radar |
| `/docs` | TechDocs browser |
| `/create` | Software scaffolder |
| `/api-docs` | API documentation |
| `/catalog-import` | Import components |
| `/search` | Global search |
| `/settings` | User settings |

## Configuration

- **Development:** `app-config.yaml`
- **Production:** `app-config.production.yaml`
- **Local secrets:** `app-config.local.yaml` (gitignored)
- **Environment:** `.env` (copy from `.env.example`)

### Required Environment Variables

```
GITHUB_TOKEN          # GitHub PAT for catalog discovery
GITHUB_CLIENT_ID      # GitHub OAuth client ID
GITHUB_CLIENT_SECRET  # GitHub OAuth client secret
GITHUB_ORG            # GitHub organization
POSTGRES_HOST         # Database host (production)
POSTGRES_PORT         # Database port
POSTGRES_USER         # Database user
POSTGRES_PASSWORD     # Database password
K8S_TOKEN             # Kubernetes service account token
K8S_CONFIG_CA_DATA    # Kubernetes CA data (base64)
```

## Code Conventions

- TypeScript strict mode enabled
- ESLint with Backstage CLI defaults
- Prettier for code formatting
- React Testing Library for component tests
- Playwright for E2E tests

## Testing

### Unit Tests
- Located in `**/*.test.tsx` and `**/*.test.ts`
- Run with `yarn test` or `yarn test:all`

### E2E Tests
- Located in `/packages/app/e2e-tests/`
- Configuration: `playwright.config.ts`
- Run with `yarn test:e2e`
- Set `PLAYWRIGHT_URL` for remote testing

## Docker Deployment

```bash
# Build and run with Docker Compose
cp .env.example .env
# Edit .env with credentials
cd docker
docker compose up -d
```

## Important Files

| File | Purpose |
|------|---------|
| `packages/app/src/App.tsx` | Main frontend app with routing |
| `packages/backend/src/index.ts` | Backend initialization |
| `app-config.yaml` | Main configuration |
| `catalog-info.yaml` | Repo's catalog entry |
| `examples/entities.yaml` | Example catalog entities |
| `examples/org.yaml` | Example users/groups |

## Adding New Features

1. For new plugins: `yarn new` and follow prompts
2. Frontend components go in `packages/app/src/components/`
3. Backend plugins are registered in `packages/backend/src/index.ts`
4. Add routes in `packages/app/src/App.tsx`

## Notes for Development

- Backend runs on port 7007, frontend on port 3000
- SQLite is used for local development (in-memory, no persistence)
- GitHub integration requires OAuth app setup
- Kubernetes plugin requires cluster access and RBAC setup
