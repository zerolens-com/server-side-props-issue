const imageConfig = {
  prod: "https://zerolens-prod.imgix.net",
  preview: "https://zerolens-prod.imgix.net",
  dev: "https://zerolens-dev.imgix.net",
  local: "https://zerolens-prod.imgix.net",
};

module.exports = {
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    loader: "imgix",
    path: imageConfig[process.env.NEXT_PUBLIC_CONFIG_MODE],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  publicRuntimeConfig: {
    VERCEL_GITHUB_COMMIT_REF: process.env.VERCEL_GITHUB_COMMIT_REF
      ? process.env.VERCEL_GITHUB_COMMIT_REF
      : "randomTokenSoLocalWorks",
  },
  webpack: (config, options) => {
    // eslint-disable-next-line no-param-reassign
    config.experiments = {
      topLevelAwait: true,
    };
    return config;
  },
  future: {
    webpack5: true,
  },
};
