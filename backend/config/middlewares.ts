export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      origin: [
        "http://localhost:3000", // Local development
        "https://nextjs-headless-store-a3pzvcjkh-morad17s-projects.vercel.app", // Your exact Vercel URL
        "https://*.vercel.app", // All Vercel deployments
        "https://nextjs-headless-store.vercel.app", // If you have a custom domain
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
      keepHeaderOnError: true,
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
