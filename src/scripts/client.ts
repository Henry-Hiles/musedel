import { createAPIClient } from "@tidal-music/api"
import auth from "./auth"
export const client = createAPIClient(auth.credentialsProvider)
