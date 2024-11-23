declare namespace NodeJS {
  interface ProcessEnv {
    DB_URI: string;
    PORT: string;
    JWT_SECRET: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_STORAGE_BUCKET: string;
    ALLOWED_ORIGINS: string;
    FIREBASE_PRIVATE_KEY: string;
    FIREBASE_CLIENT_EMAIL: string;
  }
}
