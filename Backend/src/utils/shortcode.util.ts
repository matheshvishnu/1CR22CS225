const ALPHANUMERIC_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const SHORTCODE_LENGTH = 7;

export const generateShortcode = (): string => {
  let result = '';
  for (let i = 0; i < SHORTCODE_LENGTH; i++) {
    result += ALPHANUMERIC_CHARS.charAt(Math.floor(Math.random() * ALPHANUMERIC_CHARS.length));
  }
  return result;
};

// This line explicitly tells TypeScript this is a module.
export {};
