/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="./svg.d.ts" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_KEY: string;
  readonly VITE_APP_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
