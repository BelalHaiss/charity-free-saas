export const generateTempId = () => Date.now() * 100000; // Ensure unique large temp ID

export const isDevMode = import.meta.env.DEV;
