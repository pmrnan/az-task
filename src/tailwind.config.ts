import type { Config } from "tailwindcss";

const {
  iconsPlugin,
  getIconCollections,
} = require("@egoist/tailwindcss-icons");

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // カラー設定
    colors: {
      // 基本色
      red: "#EA6C55",
      orange: "#F6B400",
      green: "#AACE39",
      beige: "#FBEFE1",
      blue: "#1E90FF",
      rose: {
        light: "#E6BFAB"
      },
      // グレースケールの詳細設定
      gray: {
        900: "#000000",
        800: "#333333",
        700: "#666666",
        600: "#999999",
        500: "#8B8B8B",
        400: "#B3B3B3",
        300: "#CCCCCC",
        200: "#F5F5F5",
        100: "#FFFFFF",
      },
    },
    // フォントファミリー設定
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
      Chathura: "Chathura",
    },
    // フォントサイズ設定
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.03em" }],
      sm: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.03em" }],
      base: ["1rem", { lineHeight: "1.5rem", letterSpacing: "0.03em" }],
      lg: ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "0.03em" }],
      xl: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "0.03em" }],
      "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "0.03em" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "0.03em" }],
      "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "0.03em" }],
      "5xl": ["3rem", { lineHeight: "1", letterSpacing: "0.03em" }],
      "6xl": ["3.5rem", { lineHeight: "1", letterSpacing: "0.03em" }],
    },
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(["tabler"]),
    }),
  ],
};

export default config;