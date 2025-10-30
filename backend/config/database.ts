import path from "path";

export default ({ env }) => {
  const databaseUrl = env("DATABASE_URL");
  const nodeEnv = env("NODE_ENV");

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
};
