import path from "path";

export default ({ env }) => {
  if (env("NODE_ENV") === "production") {
    // Parse the DATABASE_URL
    const databaseUrl = env("DATABASE_URL");

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
