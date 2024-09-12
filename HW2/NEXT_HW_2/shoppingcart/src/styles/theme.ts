// src/styles/theme.ts
const theme = {
    colors: {
        primary: '#0070f3',
        background: '#ffffff',
        text: '#333333',
        footer: '#282c34',
    },
    spacing: (factor: number) => `${factor * 8}px`,
};

export default theme;
