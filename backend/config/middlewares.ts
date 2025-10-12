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
        "http://localhost:3000",
        "http://localhost:3001",
        "https://pc-builder-deluxe-lqmk4bb2c-morad17s-projects.vercel.app",
        "https://pc-builder-deluxe.vercel.app",
        "https://*.vercel.app",
        /^https:\/\/pc-builder-deluxe.*\.vercel\.app$/,
        /^https:\/\/.*\.vercel\.app$/,
        // Add your new domain patterns
        "https://pc-builder-deluxe-*.vercel.app",
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
      credentials: true,
      // Add these additional CORS options
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Origin",
        "Access-Control-Request-Method",
        "Access-Control-Request-Headers",
      ],
      exposedHeaders: ["Content-Range", "X-Content-Range"],
      maxAge: 86400, // 24 hours
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
