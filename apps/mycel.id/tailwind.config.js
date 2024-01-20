/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./renderer/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
      title: ['"Paytone One"', ...defaultTheme.fontFamily.sans],
      mono: ['Inconsolata', ...defaultTheme.fontFamily.mono],
    },
    extend: {
      colors: {
        samon: "var(--c-samon)",
        trinidad: "var(--c-trinidad)",
        saffron: "var(--c-saffron)",
        jade: "var(--c-jade)",
        lochmara: "var(--c-lochmara)",
        piano: "var(--c-piano)",
        smoke: "var(--c-smoke)",
      },
      boxShadow: {
        solid: "4px 4px var(--c-piano)",
        "solid-sm": "2px 2px var(--c-piano)",
        "solid-xs": "1px 1px var(--c-piano)",
      },
    },
  },
  plugins: [],
}

