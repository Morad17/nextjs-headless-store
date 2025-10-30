export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
  admin: {
    url: env("ADMIN_URL", "/admin"),
    host: env("ADMIN_HOST", "localhost"),
    port: env.int("ADMIN_PORT", 1337),
    serveAdminPanel: env.bool("SERVE_ADMIN_PANEL", true),
  },
});
