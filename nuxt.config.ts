export default defineNuxtConfig({
  css: ['@/assets/styles/index.scss'],
  devtools: { enabled: false },

  build: {
    transpile: ['fsevents'],
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['import', 'mixed-decls'],
        },
      },
    },
  },

  modules: [
    '@nuxt/eslint',
    [
      '@storyblok/nuxt',
      {
        accessToken: process.env.STORYBLOK_TOKEN,
        apiOptions: {
          region: 'us',
        },
      },
    ],
  ],

  eslint: {
    config: {
      typescript: true,
    },
  },

  runtimeConfig: {
    public: {
      STORYBLOK_TOKEN: process.env.STORYBLOK_TOKEN,
      ENVIROMENT: process.env.NODE_ENV,
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  typescript: {
    strict: false,
  },

  compatibilityDate: '2025-04-26',
})