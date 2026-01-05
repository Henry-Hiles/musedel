import player from "./player"
import { ExtendableTimeout } from "./timeout"

const play = document.querySelector("#play")
const played = document.querySelector("#played")
const skip = document.querySelector("#skip")
const available = document.querySelector("#available")

let phase = 1
let timer: ExtendableTimeout | null

const getTimeout = (phase: number) => (2 ** phase - 1) * 1000

const playSong = async () => {
    played?.classList.remove("playing")
    await player.load({
        productId: "36737274",
        productType: "track",
        sourceId: "",
        sourceType: "",
    })
    await player.play()
    played?.classList.add("playing")

    timer?.cancel()
    timer = new ExtendableTimeout(() => {
        player.pause()
        timer = null
        played?.classList.remove("playing")
    }, getTimeout(phase))
}

play?.addEventListener("click", playSong)

skip?.addEventListener("click", () => {
    if (phase >= 4) return alert("FAIL!!!!") // TODO
    phase += 1

    // @ts-expect-error
    available.style["grid-column-end"] = phase + 1

    if (timer == null) {
        playSong()
    } else {
        timer.extend(getTimeout(phase))
    }
})
