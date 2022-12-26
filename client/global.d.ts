/// <reference types="vite/client" />

declare namespace NodeJS {
  export interface ProcessEnv {
    VITE_HOST: string;
    VITE_PORT: string;
    VITE_PROXY: string;
  }
}
