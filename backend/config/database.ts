import path from "path";

export default ({ env }) => {
  const databaseUrl = env("DATABASE_URL");
  const nodeEnv = env("NODE_ENV");

  console.log("🔍 Database Config Debug:");
  console.log("NODE_ENV:", nodeEnv);
  console.log("DATABASE_URL exists:", !!databaseUrl);

  // ✅ FIRST: Check for DATABASE_URL (Railway production/development)
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

  // ✅ SECOND: Use SQLite only for local development without DATABASE_URL
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

  // ✅ THIRD: Fallback to individual PostgreSQL variables
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
