/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'share-tech': ['"Share Tech Mono"', 'monospace'],
                'teko': ['"Teko"', 'sans-serif'],
                'industrial': ['"Teko"', 'sans-serif'],
            },
            colors: {
                // Eisenbund Design System
                primary: {
                    DEFAULT: '#8b0000',
                    hover: '#a00000',
                    dark: '#5a0000',
                },
                surface: {
                    DEFAULT: '#1a1a1a',
                    dark: '#0d0d0d',
                    border: '#333333',
                },
                stone: {
                    950: '#0c0a09',
                },
            },
            backgroundImage: {
                'gradient-dark': 'linear-gradient(to bottom right, #18181b, #23272f, #0d0d0d)',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out',
                'slide-up': 'slideUp 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}
