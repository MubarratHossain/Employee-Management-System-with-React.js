/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'], // Set Space Grotesk as the default font
      },
      // Adding custom keyframes and animation for marquee effect
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee 15s linear infinite', // Apply the marquee animation to the elements
      },
    },
  },
  plugins: [
    require('tw-elements-react'),
  ],
}
