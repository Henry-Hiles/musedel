import * as eventProducer from "@tidal-music/event-producer"
import * as player from "@tidal-music/player"
import auth from "./auth"

player.setCredentialsProvider(auth.credentialsProvider)
player.setEventSender(eventProducer)

export default player
