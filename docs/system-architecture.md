# System architecture

## Browser website

The React application provides the responsive English interface for login, dashboards, retail browsing, AI chat, approved administrator forms, employee management, and business audit records. It calls the authenticated Express API. UI visibility is not an authorization boundary; the API enforces permissions for every protected request.

## API and data access

The Node.js/Express backend owns authentication, roles, business validation, exports, configuration context, and audit events. It uses a PostgreSQL application store and connects to a separately configured retail dataset. Retail browsing and assistant queries use approved read permissions. Administrator forms use a separate, narrowly scoped write path.

## Assistant and MCP

The server-side assistant sends only necessary question, schema, and approved mapping context to a supported language model. A dedicated MCP server exposes approved schema discovery, relationship and mapping information, and safe read-only query execution. Every query is structurally validated and executed with least privilege, row limits, and timeouts. The assistant has no write capability for any user role.

Detailed retail query results remain in the backend and browser response path. Conversation text, generated SQL, and retail result rows are not stored as permanent chat history. Configuration identity and mapping version travel with each request so cached or in-flight results cannot be presented under a different active dataset.

## Configuration and activation

Only authorized technical personnel configure database connections, supported providers, and versioned retail mappings. Validate connectivity, schema objects, types, relationships, mappings, and permissions before activation. Keep secrets outside source control and outside browser assets.

## Reference

Behavior and security details are defined by [the Software Requirements Specification](SQL_Assistant_SRS.docx). This document summarizes the intended boundaries; it does not replace requirement IDs or acceptance criteria.
