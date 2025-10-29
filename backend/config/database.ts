import path from "path";

export default ({ env }) => {
  const databaseUrl = env("DATABASE_URL");
  if (databaseUrl) {
    console.log("🔗 Using DATABASE_URL for connection");
    return {
      connection: {
        client: "postgres",
        connection: {
          connectionString: databaseUrl,
          ssl:
            env("NODE_ENV") === "production"
              ? false
              : {
                  rejectUnauthorized: false,
                },
        },
        debug: false,
      },
    };
  }

  // Fallback to individual environment variables

  if (env("NODE_ENV") === "development") {
    // Development (SQLite)
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
  // Parse the DATABASE_URL

  console.log("🔗 Using individual database variables");
  return {
    connection: {
      client: "postgres",
      connection: {
        host: env("PGHOST"),
        port: env.int("PGPORT", 5432),
        database: env("PGDATABASE"),
        user: env("PGUSER"),
        password: env("PGPASSWORD"),
        ssl:
          env("NODE_ENV") === "production"
            ? false
            : {
                rejectUnauthorized: false,
              },
      },
      debug: false,
    },
  };
};
