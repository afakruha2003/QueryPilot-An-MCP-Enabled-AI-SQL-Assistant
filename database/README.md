# Database setup and retail mappings

The application database and the active retail dataset are separate concerns and must use separate credentials. The root Docker Compose file provides only a local development PostgreSQL instance; it does not create or import a retail dataset.

The technical team prepares retail data as related PostgreSQL tables and approves a versioned semantic mapping before activation. Add real mapping files only after the dataset, business rules, editable fields, and required versus optional concepts are agreed. Do not infer joins, sales definitions, or physical table names from the UI.

The assistant must connect with a read-only role. Business form writes use a separate narrowly scoped role and are restricted to approved tables and fields. Retail record deletion and schema changes are outside the first release.

## Local application database

Start the local instance with `docker compose up -d postgres`. Development credentials are for local use only. Configure any real dataset connection separately through protected server-side environment or deployment settings; never add production connection strings to the repository.
