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
        "https://nextjs-headless-store-67ttczggu-morad17s-projects.vercel.app", // Your current deployment
        "https://*.vercel.app", // All Vercel deployments
        "https://nextjs-headless-store.vercel.app", // Production domain if you have one
        "https://morad17s-projects.vercel.app", // Your Vercel account domain
        /^https:\/\/nextjs-headless-store.*\.vercel\.app$/, // Regex for all your deployments
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
