export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        electric: '#0066ff',
        cyan: '#00f2fe',
        surface: '#f8fafc',
        slate: { 950: '#0f172a', 900: '#0f172a', 800: '#1e293b', 700: '#334155' },
        // Existing component tokens map to the refreshed blue/cyan and light palette.
        plum: { 950: '#f8fafc', 900: '#f1f5f9', 800: '#ffffff', 700: '#e2e8f0' },
        blush: { DEFAULT: '#cffafe', deep: '#a5f3fc' },
        cream: '#0f172a',
        ink: '#0f172a',
        emerald: { 900: '#0047b3', 700: '#0052cc', 600: '#0066ff', 500: '#0066ff', 400: '#00b8d4' },
      },
      fontFamily: { display: ['"Playfair Display"', 'Georgia', 'serif'], sans: ['"DM Sans"', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}
