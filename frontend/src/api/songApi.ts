import iaxios from './iaxios'
import { ISongSummary, type IGenre, ISong } from '../types'

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

export function getSongList(params?: {[key: string]: string}|null, summary: boolean = false) {
    let url = summary ? '/songs-summary/' : '/songs/';
    if (params) {
        const qs = new URLSearchParams(Object.entries(params)).toString()
        url += '?' + qs
    }
    return iaxios.get<ISongSummary[]>(url)
}

export function getSongDetail(id: number) {
    const url = `/songs/${id}/`
    return iaxios.get<ISong>(url)
}


