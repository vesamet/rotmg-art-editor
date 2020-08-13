import Vue from "vue"
import Vuetify from "vuetify/lib"

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#3f51b5",
        secondary: "#673ab7",
        accent: "#9c27b0",
        error: "#e91e63",
        warning: "#ff5722",
        info: "#607d8b",
        success: "#8bc34a",
      },
    },
  },
})
