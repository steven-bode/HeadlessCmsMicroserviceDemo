declare module "vite/client" {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
  }
} 