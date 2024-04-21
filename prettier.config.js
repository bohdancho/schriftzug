/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
    plugins: ['prettier-plugin-tailwindcss'],
    printWidth: 120,
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    jsxSingleQuote: true,
    trailingComma: 'all',
}

export default config
