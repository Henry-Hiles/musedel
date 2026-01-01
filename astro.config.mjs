// @ts-check
import { defineConfig, passthroughImageService } from "astro/config"

// https://astro.build/config
export default defineConfig({
    trailingSlash: "never",
    build: { format: "directory" },
    image: { service: passthroughImageService() },
    site: "https://henry-hiles.github.io/musedel",
})
