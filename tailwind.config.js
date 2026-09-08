/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', '"Noto Sans TC"', 'sans-serif'],           
        display: ['Nunito', '"M PLUS Rounded 1c"', 'sans-serif'], 
        accent: ['"Tilt Neon"', '"Noto Sans TC"', 'sans-serif']       
      },
      colors: {
        brand: {
          orange: '#F26B24', // STP logo background
          blue: '#0000FF',   // Logo border
          red: '#FF0000',    // Traffic light top
          yellow: '#FFEA00', // Traffic light middle
          green: '#00FF00',  // Traffic light bottom
        }
      }
    },
  },
  plugins: [],
}