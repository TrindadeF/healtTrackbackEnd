// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    DB_URI: string;
    PORT?: string;
  }
}
