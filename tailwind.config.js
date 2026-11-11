export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
        colors: {
        electric: '#0052cc',
        cyan: '#0ea5e9',
        surface: '#f8fafc',
        // Changed from dark navy to light grays so alternating sections stay bright
        slate: { 950: '#f1f5f9', 900: '#f8fafc', 800: '#e2e8f0', 700: '#cbd5e1' },
        plum: { 950: '#f8fafc', 900: '#f1f5f9', 800: '#ffffff', 700: '#e2e8f0' },
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
