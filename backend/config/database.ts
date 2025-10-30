import path from "path";

export default ({ env }) => {
  const databaseUrl = env("DATABASE_URL");
  const nodeEnv = env("NODE_ENV");

  // If we have DATABASE_URL, always use PostgreSQL (Railway)

  // Only use SQLite if no DATABASE_URL is provided AND in development
  if (nodeEnv === "development") {
    console.log("🔗 Using SQLite for local development");
    return {
      connection: {
        client: "sqlite",
        connection: {
          filename: env("DATABASE_FILENAME", ".tmp/data.db"),
        },
        useNullAsDefault: true,
      },
    };
  }
  if (databaseUrl) {
    console.log("🔗 Using DATABASE_URL for PostgreSQL connection");
    console.log("🌍 Environment:", nodeEnv);

    return {
      connection: {
        client: "postgres",
        connection: {
          connectionString: databaseUrl,
          ssl:
            nodeEnv === "production"
              ? false // Railway internal doesn't need SSL
              : { rejectUnauthorized: false }, // External Railway needs SSL config
        },
        debug: false,
      },
    };
  }

  // Fallback to individual PostgreSQL variables
  console.log("🔗 Using individual PostgreSQL variables");
  return {
    connection: {
      client: "postgres",
      connection: {
        host: env("PGHOST"),
        port: env.int("PGPORT", 5432),
        database: env("PGDATABASE"),
        user: env("PGUSER"),
        password: env("PGPASSWORD"),
        ssl: nodeEnv === "production" ? false : { rejectUnauthorized: false },
      },
      debug: false,
    },
  };
};
