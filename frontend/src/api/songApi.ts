import iaxios from './iaxios'
import { ISongSummary, type IGenre, ISong, IPlaylist, IPaginatedResponse } from '../types'

interface IGetRequestParams {
    limit?: number,
    offset?: number,
    params?: {[key: string]: string}
}


export function getGenreList() {
    return iaxios.get<IGenre[]>('/genres/')
}

interface createSongData {
    title: string
    genre: number
    description: string
    duration: string
    image: File
    artists: string
    file: File
}
export function createSong(data: createSongData) {
    const formData = new FormData()
    for (let [key, value] of Object.entries(data)) {
        formData.append(key, value)
    }
    return iaxios.post('/songs/', data, {
        headers: {'Content-Type': 'multipart/form-data'}
    })
}

export interface updateSongData {
    title: string
    genre: number
    description: string
    duration: string
    image?: File
    artists: string
    file?: File
}

export function updateSong(id: number, data: updateSongData) {
    const formData = new FormData()
    for (let [key, value] of Object.entries(data)) {
        formData.append(key, value)
    }
    return iaxios.patch(`/songs/${id}/`, data, {
        headers: {'Content-Type': 'multipart/form-data'}
    })
}

export function deleteSong(id: number) {
    return iaxios.delete(`/songs/${id}/`)
}

interface getSongListParams extends IGetRequestParams {
    summary?: boolean;
}
export function getSongList({limit=10, offset=0, params, summary}: getSongListParams) {
    let querystring = `?limit=${limit}&offset=${offset}`
    if (params) {
        const qs = new URLSearchParams(Object.entries(params)).toString()
        querystring += '&' + qs
    }

    if (summary) 
        return iaxios.get<IPaginatedResponse<ISongSummary>>('/songs-summary/' + querystring)
    else
        return iaxios.get<IPaginatedResponse<ISong>>('/songs/' + querystring)
}

export function getSongDetail(id: number) {
    const url = `/songs/${id}/`
    return iaxios.get<ISong>(url)
}


export function getLikedPlaylists(limit: number = 10, offest: number = 0) {
    return iaxios.get<IPaginatedResponse<IPlaylist>>(`/playlists/liked/?limit=${limit}&offset=${offest}`)
}

export function getPlaylistList({limit=10, offset=1, params}: IGetRequestParams) {
    let url = `/playlists/?limit=${limit}&offset=${offset}`
    if (params) {
        const qs = new URLSearchParams(Object.entries(params)).toString()
        url += '&' + qs;
    }
    return iaxios.get<IPaginatedResponse<IPlaylist>>(url);
}

export function getPlaylistDetail(id: number) {
    return iaxios.get<IPlaylist>(`/playlists/${id}/`)
}

export function createEmptyPlaylist() {
    return iaxios.post('/playlists/', {title: 'Playlist ' + Math.random().toString().slice(2, 7)})
}

export function addSongToPlaylist(playlistId: number, songId: number) {
    return iaxios.put<ISong>(`/playlists/${playlistId}/add-song/${songId}/`)
}

export function removeSongFromPlaylist(playlistId: number, songId: number) {
    return iaxios.put(`/playlists/${playlistId}/remove-song/${songId}/`)
}