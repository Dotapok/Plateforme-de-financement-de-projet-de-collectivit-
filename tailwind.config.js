/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Couleurs du Cameroun
        cameroon: {
          green: '#228B22',
          red: '#DC143C',
          yellow: '#FFD700',
        },
        // Palette institutionnelle
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          900: '#14532d',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          900: '#78350f',
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
  safelist: [
    // Couleurs dynamiques pour les badges et KPIs
    'bg-blue-50', 'bg-blue-100', 'bg-blue-900/20', 'text-blue-600', 'text-blue-800', 'text-blue-900', 'text-blue-100', 'text-blue-300', 'text-blue-400',
    'border-blue-200', 'border-blue-800', 'hover:bg-blue-100', 'hover:bg-blue-900/30',
    'bg-green-50', 'bg-green-100', 'bg-green-900/20', 'text-green-600', 'text-green-800', 'text-green-900', 'text-green-100', 'text-green-300', 'text-green-400',
    'border-green-200', 'border-green-800', 'hover:bg-green-100', 'hover:bg-green-900/30',
    'bg-yellow-50', 'bg-yellow-100', 'bg-yellow-900/20', 'text-yellow-600', 'text-yellow-800', 'text-yellow-900', 'text-yellow-100', 'text-yellow-300', 'text-yellow-400',
    'border-yellow-200', 'border-yellow-800', 'hover:bg-yellow-100', 'hover:bg-yellow-900/30',
    'bg-red-50', 'bg-red-100', 'bg-red-900/20', 'text-red-600', 'text-red-800', 'text-red-900', 'text-red-100', 'text-red-300', 'text-red-400',
    'border-red-200', 'border-red-800', 'hover:bg-red-100', 'hover:bg-red-900/30',
    'bg-purple-50', 'bg-purple-100', 'bg-purple-900/20', 'text-purple-600', 'text-purple-800', 'text-purple-900', 'text-purple-100', 'text-purple-300', 'text-purple-400',
    'border-purple-200', 'border-purple-800', 'hover:bg-purple-100', 'hover:bg-purple-900/30',
    'bg-orange-50', 'bg-orange-100', 'bg-orange-900/20', 'text-orange-600', 'text-orange-800', 'text-orange-900', 'text-orange-100', 'text-orange-300', 'text-orange-400',
    'border-orange-200', 'border-orange-800', 'hover:bg-orange-100', 'hover:bg-orange-900/30',
    'bg-indigo-50', 'bg-indigo-100', 'bg-indigo-900/20', 'text-indigo-600', 'text-indigo-800', 'text-indigo-900', 'text-indigo-100', 'text-indigo-300', 'text-indigo-400',
    'border-indigo-200', 'border-indigo-800', 'hover:bg-indigo-100', 'hover:bg-indigo-900/30',
    'bg-gray-50', 'bg-gray-100', 'bg-gray-800', 'bg-gray-900/10', 'text-gray-600', 'text-gray-800', 'text-gray-300', 'text-gray-400',
    'border-gray-200', 'border-gray-600', 'border-gray-800', 'hover:bg-gray-100', 'hover:bg-gray-600'
  ]
};