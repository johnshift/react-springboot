/**
 * NOTE: All code here is bundled on critical JS
 */
export const REGEXP_NEAT_URI = /^[a-zA-Z][a-zA-Z0-9-]*$/;
export const REGEXP_EMAIL = new RegExp(
  '^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$',
);

export const MSG_SOMETHING_WENT_WRONG = 'Something went wrong :(';

export const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
