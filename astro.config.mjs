// @ts-check
import { defineConfig, passthroughImageService } from "astro/config"

// https://astro.build/config
export default defineConfig({
    trailingSlash: "never",
    build: { format: "directory" },
    image: { service: passthroughImageService() },
    base: "/musedle",
    vite: {
        optimizeDeps: {
            esbuildOptions: {
                target: "esnext",
            },
        },
        build: {
            target: "esnext",
        },
    },
})
