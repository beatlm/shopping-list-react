/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'system': ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      colors: {
        'apple-gray-50': '#f9fafb',
        'apple-gray-100': '#f3f4f6',
        'apple-gray-200': '#e5e7eb',
        'apple-gray-300': '#d1d5db',
        'apple-gray-400': '#9ca3af',
        'apple-gray-500': '#6b7280',
        'apple-gray-600': '#4b5563',
        'apple-gray-700': '#374151',
        'apple-blue': '#007aff',
        'apple-blue-light': '#e8f4ff',
        'apple-red': '#ff3b30',
        'apple-green': '#34c759',
      },
      spacing: {
        'safe': 'max(1rem, env(safe-area-inset-left))',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
      },
      boxShadow: {
        'apple-sm': '0 1px 3px rgba(0, 0, 0, 0.08)',
        'apple-md': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'apple-lg': '0 4px 16px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}

