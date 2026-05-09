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
        'apple-gray-900': '#111827',
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
        'apple-md': '0 4px 12px rgba(0, 122, 255, 0.15)',
        'apple-lg': '0 8px 24px rgba(0, 122, 255, 0.2)',
      },
      backgroundImage: {
        'gradient-apple': 'linear-gradient(135deg, #007aff 0%, #9333ea 50%, #ec4899 100%)',
        'gradient-subtle': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-out',
        'slideInUp': 'slideInUp 0.4s ease-out',
        'bounce-subtle': 'bounce-subtle 2s infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

