declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NG_APP_ENV: string;
    readonly NG_OPENAI_API_KEY: string;
    readonly NG_OPENAI_ORGANIZATION_ID: string;
    readonly NG_PEXEL_API_KEY: string;
    readonly NG_FORMSPREE_ID: string;
    readonly NG_SECONDS_IN_WHICH_MODAL_SALE_IS_DISPLAYED: string;
  }
}
