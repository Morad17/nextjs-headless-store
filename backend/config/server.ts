export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
  // ✅ Fix the URL configuration
  url:
    env("RAILWAY_STATIC_URL") ||
    env("RAILWAY_PUBLIC_DOMAIN") ||
    env("PUBLIC_URL"),
  admin: {
    url: "/admin",
    serveAdminPanel: env.bool("SERVE_ADMIN_PANEL", true),
  },
});
