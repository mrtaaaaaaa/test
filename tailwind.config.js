/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#FFFFFF",
      dark: {
        d_1: "#202020",
        d_2: "#121212",
      },
      blue: {
        // New design
        DEFAULT: "#1242E0",
        50: "#E2ECFC",
        100: "#E3ECFF",
        200: "#B1C8FD",
        250: "#376BFA",
        300: "#7299FC",

        primary: "#2B3990",
        active: "#EAF1F3",
        text: "#556987",
        secondary: "#90A3BF",
        custom: "#1242E0",
        400: "#518A9D",
        600: "#0E5A73",
      },
      purple: {
        DEFAULT: "#9747FF",
        100: "#F0E4FF",
      },
      red: {
        DEFAULT: "#FB4432",
        100: "#F3EAEA",
        500: "#D90201",
      },
      green: {
        DEFAULT: "#258574",
        100: "#ECf9f1",
      },
      gray: {
        // New design
        DEFAULT: "#2A3343",
        100: "#FCFCFC",
        150: "#F0F0F1",
        200: "#BFBFBF",
        250: "#E8E7E6",
        300: "#979797",
        400: "#C4C4C4",
        500: "#D0D0D0",
        600: "#62666D",
        800: "#151618",
        900: "#121127",

        dark: "#727272",
        light: "#F6F6F6",
        lightest: "#F2F2F2",
        disabled: "#D3D3D3",
        border: "#CFD3D4",
        socialBg: "#242D3D",
        50: "#FBFBFB",
        250: "#E4E4E4",
        700: "#727272",
      },

      yellow: {
        300: "#FFD873",
        700: "#624801",
      },
      orange: {
        DEFAULT: "#EB6E02",
        100: "#FDF1E6",
      },
    },
    screens: {
      xs: "260",
      sm: "576px",
      md: "768px",
      tablet: "1000px",
      lg: "1200px",
      xl: "1440px",
    },
    // borderRadius: {
    //   DEFAULT: '3px'
    // },
    extend: {},
  },
  plugins: [],
};
