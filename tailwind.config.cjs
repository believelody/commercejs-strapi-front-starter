const colors = require('tailwindcss/colors')

module.exports = {
  content: ["src/**/*.{html,js,svelte}"],
  theme: {
    extend: {
      colors: {
        green: colors.emerald,
        yellow: colors.amber,
        purple: colors.violet,
      }
    },
  },
}
