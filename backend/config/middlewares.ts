export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      headers: "*",
      origin: [
        "http://localhost:3000", // Development
        "https://nextjs-headless-store-r6v316sr2-morad17s-projects.vercel.app", // Your NEW Vercel URL
        "https://*.vercel.app", // All Vercel deployments
        "https://nextjs-headless-store.vercel.app", // Production domain
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
      credentials: true,
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
