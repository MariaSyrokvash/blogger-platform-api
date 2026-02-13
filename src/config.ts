import { config } from 'dotenv';
config(); // добавление переменных из файла .env в process.env

export const APP_CONFIG = {
  PORT: process.env.PORT || 3003,
  AUTH: {
    BASIC: {
      LOGIN: process.env.BASIC_AUTH_LOGIN || 'admin',
      PASSWORD: process.env.BASIC_AUTH_PASSWORD || 'qwerty',
    },
  },
  PATH: {
    ROOT: '/',
    BLOGS: {
      BASE: '/blogs',
      BY_ID: '/:id',
    },
    POSTS: {
      BASE: '/posts',
      BY_ID: '/:id',
    },
    TEST: {
      BASE: '/testing',
      DB: '/all-data',
    },
  },
};
