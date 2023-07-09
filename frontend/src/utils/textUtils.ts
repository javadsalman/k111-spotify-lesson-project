import { IArtist } from "../types";

export function getArtistText(artistList: IArtist[]) {
    return artistList.map(artist => [artist.first_name, artist.last_name].join(' ')).join(', ')
}

export function getDurationFromSeconds(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60).toString()
    const seconds = (totalSeconds % 60).toString()
    return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
}