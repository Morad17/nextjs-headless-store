import path from "path";

export default ({ env }) => {
  if (env("NODE_ENV") === "production") {
    // Parse the DATABASE_URL
    const databaseUrl = env("DATABASE_URL");

    return {
      connection: {
        client: "postgres",
        connection: {
          host: env("PGHOST", "localhost"),
          port: env.int("PGPORT", 5432),
          database: env("PGDATABASE", "strapi"),
          user: env("PGUSER", "strapi"),
          password: env("PGPASSWORD", "strapi"),
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
};
