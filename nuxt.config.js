export default {
  server: {
    port: 3005
  },
  env: {
    NODE_ENV: process.env.NODE_ENV,
    HTTP_PORT: process.env.HTTP_PORT,
    HTTPS_PORT: process.env.HTTPS_PORT,
    ROOT_API: process.env.ROOT_API
  },
  publicRuntimeConfig: {
    baseUrl: process.env.ROOT_API,
    axios: {}
  },
  privateRuntimeConfig: {},
  head: {
    title: "nuxt-app",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/bootstrap-vue",
    "@/plugins/vue-social-sharing",
    "@/plugins/vue-screen"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
