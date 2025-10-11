import path from "path";

export default ({ env }) => {
  if (env("NODE_ENV") === "production") {
    // Parse the DATABASE_URL
    const databaseUrl = env("DATABASE_URL");

    return {
      connection: {
        client: "postgres",
        connection: databaseUrl,
        acquireConnectionTimeout: 60000,
        pool: {
          min: 2,
          max: 10,
        },
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
