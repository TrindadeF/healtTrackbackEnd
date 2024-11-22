declare namespace NodeJS {
  interface ProcessEnv {
    DB_URI: string;
    PORT: string;
    JWT_SECRET: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_STORAGE_BUCKET: string;
    FIREBASE_DATABASE_URL: string;
    ALLOWED_ORIGINS: string;
  }
}
