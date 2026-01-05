import { client } from "./client"
import { debounce } from "./debounce"

const search = document.querySelector("#search") as HTMLInputElement

search?.addEventListener(
    "input",
    debounce(async (event) => {
        const target = event.target as HTMLInputElement
        const value = target.value
        const tracks = await client.GET(
            "/searchResults/{id}/relationships/tracks",
            {
                params: {
                    path: { id: value },
                    query: { countryCode: "US" },
                },
            }
        )

        if (!tracks.response.ok)
            alert(
                "An error occurred while fetching tracks, please try again later."
            )

        if (tracks.data?.data == null) return

        const withArtists = await client.GET("/tracks", {
            params: {
                query: {
                    "filter[id]": tracks.data.data?.map((track) => track.id),
                    include: ["artists"],
                    countryCode: "US",
                },
            },
        })

        if (!withArtists.response.ok)
            alert(
                "An error occurred while fetching track info, please try again later."
            )

        const autocomplete = document.querySelector("#autocomplete")

        autocomplete?.replaceChildren(
            ...(tracks.data?.data
                ?.map((orderedTrack) => {
                    const track = withArtists.data?.data.find(
                        (track) => track.id == orderedTrack.id
                    )
                    if (track == null) return

                    if (
                        track.attributes == null ||
                        !(
                            "title" in track.attributes &&
                            "relationships" in track
                        )
                    )
                        return

                    const span = document.createElement("button")

                    span.dataset.title = track.attributes.title
                    span.dataset.artists = track.relationships?.artists.data
                        ?.map((artist) => artist.id)
                        .join()
                    span.textContent = `${
                        track.attributes.title
                    } - ${track.relationships?.artists.data
                        ?.map((songArtist) => {
                            const artist = withArtists.data?.included?.find(
                                (artist) => artist.id == songArtist.id
                            )
                            if (
                                artist?.attributes == null ||
                                !("name" in artist.attributes)
                            )
                                return
                            return artist?.attributes?.name
                        })
                        .join(", ")}`

                    return span
                })
                .filter((element) => element != null) as HTMLSpanElement[])
        )
    })
)
