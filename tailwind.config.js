/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#F8FAF8',
        mist: '#F0F4F1',
        pine: '#16201E',
        forest: '#16201E',
        slate2: '#576864',
        hairline: '#DFE6E2',
        emerald2: '#2D6A4F',
        suede: '#B08968',
        bone: '#DFE6E2',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'Cambria', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
