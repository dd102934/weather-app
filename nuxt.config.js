import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios',
    '~/plugins/api',
    {
      src: '~/plugins/vue-chart',
      ssr: false
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Simple usage
    'nuxt-leaflet',

    // With options
    [
      'nuxt-leaflet',
      {
        /* module options */
      }
    ],
    '@nuxtjs/proxy',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  proxy: {
    '/api/': {
      target: 'https://api.darksky.net',
      pathRewrite: { '^/api/': '' }
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: colors.indigo.base,
          secondary: colors.purple.base,
          accent: colors.cyan.base,
          error: colors.red.base,
          warning: colors.orange.base,
          info: colors.lightBlue.base,
          success: colors.green.base
        }
      }
    }
  },
  generate: {
    fallback: true
  },
  env: {
    MAP_BOX_API_KEY: process.env.MAP_BOX_API_KEY,
    OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
