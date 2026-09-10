/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./*.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "bcg-dark": "#30495f",
        "bcg-green": "#5c829c",
        "bcg-light-green": "#c2e2eb",
        "bcg-beige": "#bac6c0",
        "bcg-gray": "#86867d",
        "bcg-text": "#1a1a1a",
      },
      fontFamily: {
        serif: ["ClashDisplay-Medium", "sans-serif"],
        sans: ["ClashDisplay-Regular", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "menu-reveal": "menuReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scroll-left": "scrollLeft var(--duration, 60s) linear infinite",
        "scroll-right": "scrollRight var(--duration, 60s) linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        menuReveal: {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scrollLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scrollRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
}
