/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Cloud name Cloudinary per servire le foto dello studio dal CDN. */
  readonly VITE_CLOUDINARY_CLOUD_NAME?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
