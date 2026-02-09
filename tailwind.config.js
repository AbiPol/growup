
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./projects/shell/src/**/*.{html,ts,scss}",
        "./projects/student/src/**/*.{html,ts,scss}",
        "./projects/admin/src/**/*.{html,ts,scss}",
        "./projects/teacher/src/**/*.{ts,tsx,css}",
        "./shared/**/*.{html,ts,css,scss}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
