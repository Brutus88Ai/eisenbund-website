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
            },
            colors: {
                stone: {
                    950: '#0c0a09',
                }
            }
        },
    },
    plugins: [],
}
