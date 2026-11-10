export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        electric: '#0052cc',
        cyan: '#0ea5e9',
        surface: '#f8fafc',
        slate: { 950: '#0f172a', 900: '#0f172a', 800: '#1e293b', 700: '#334155' },
        // Existing component tokens map to the refreshed blue/cyan and light palette.
        plum: { 950: '#f8fafc', 900: '#f1f5f9', 800: '#ffffff', 700: '#e2e8f0' },
        // Fixed: Forces the text elements using 'blush' to become dark navy
        blush: { DEFAULT: '#0f172a', deep: '#1e293b' },
        cream: '#0f172a',
        ink: '#0f172a',
        emerald: { 900: '#0047b3', 700: '#0052cc', 600: '#0052cc', 500: '#0d4f7a', 400: '#0f4c81' },
      },
      fontFamily: { display: ['"Playfair Display"', 'Georgia', 'serif'], sans: ['"DM Sans"', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}
