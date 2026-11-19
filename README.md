# QueryPilot

QueryPilot is a browser-based retail analytics website with a natural-language SQL assistant. The first release targets PostgreSQL retail datasets that have been prepared and approved by the technical team.

## Project structure

- `frontend/` — React website for dashboards, retail browsing, the assistant, and business administration.
- `backend/` — Express API for authentication, authorization, business operations, and assistant orchestration.
- `database/` — local development database setup and approved retail semantic-mapping guidance.
- `docs/` — the requirements specification, UI references, and technical documentation.

The AI assistant and MCP tools are server-side capabilities. Assistant database access must remain read-only for every role. Approved administrator forms use a separate, narrowly scoped write path.

## Requirements

- Node.js 20 or newer and npm
- Docker Desktop (optional, for a local PostgreSQL instance)

## Run locally

1. Copy `.env.example` to `.env` and set local values.
2. Start PostgreSQL with `docker compose up -d postgres` if you need a local database.
3. Install dependencies from the repository root with `npm install`.
4. Start the website with `npm run dev --workspace frontend`.
5. Open the URL printed by Vite (normally `http://localhost:5173`).

The current starter provides a responsive seven-screen UI preview. The screens cover sign-in, dashboard, retail browsing, AI assistant, admin record forms, employee management, and business audit records. The backend folder contains setup scaffolding only; no API runtime or business logic is implemented yet. Live authentication, retail queries, exports, form writes, audit persistence, and MCP-backed AI behavior must be implemented against the approved requirements and dataset.

## Project references

- [Software Requirements Specification](docs/SQL_Assistant_SRS.docx)
- [UI reference screens](docs/SQL-Assistant%20UI.zip)
- [System architecture](docs/system-architecture.md)
- [Database and mapping notes](database/README.md)

Never commit `.env` files, credentials, production data, generated SQL results, or user conversations.
