/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["MouldyCheeseRegular", ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primaryBackground: "#6f8e99",
        secondaryBackground: "#75846a ",
        secondaryBackgroundHover: "#535c4c ",
        header: "#ae6667",
        footer: "#ae6667",
        highlights: "#f9af42 ",
        //chessboard
        blackSquare: "#AAB396 ",
        whiteSquare: "#f8f7e5 ",
        solidBlack: "#1D1D1D",
        thickBorder: " #5a6f76",
        bordersDividers: "#75846a ",
        //menu items
        sidePanel: "#75846a",
        sidePanelShadow: "#626d5a",
        //text
        primaryText: "#2E1E0F",
        hoverText: "#A59d88",

        //buttons
        buttonBackground: "#f9af42",
        buttonText: "#000000",
        buttonHover: "#9C8465",

        buttonBackground2: "#f8f7e5",
        buttonText2: "#000000",
        buttonHover2: "#c3c2b4",

        defaultText: "#F4E9CD",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
};
