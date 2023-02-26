declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NG_APP_ENV: string;
    readonly NG_OPENAI_API_KEY: string;
    readonly NG_PEXEL_API_KEY: string;
  }
}
