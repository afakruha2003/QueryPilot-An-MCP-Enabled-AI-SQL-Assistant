# Assistant and MCP boundary

The assistant is a backend capability, not a browser-side integration. Its eventual orchestration layer should call a dedicated MCP server that exposes only approved schema and semantic metadata plus a validated read-only query tool.

Before enabling database tools, implement structural SQL validation, parameter and resource limits, statement timeouts, query cancellation, active-configuration versioning, and a least-privilege PostgreSQL read-only role. Never send detailed retail result rows to the language model. Do not add write tools to MCP, including for Business Admins.

The administrator form API must remain a separate, allowlisted write path with backend validation and audit recording. Do not route form writes through the assistant.
