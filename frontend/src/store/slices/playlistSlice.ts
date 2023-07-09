import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ISong } from "../../types";


interface IPlaylistReduxState {
    songs: ISong[]
    path: string
    currentSongId: number
}

const initialState: IPlaylistReduxState = {
    songs: [],
    path: '',
    currentSongId: 0
}

const playlistSlice = createSlice({
    name: 'playlistSlice',
    initialState: initialState,
    reducers: {
        setPlaylist(state, action: PayloadAction<IPlaylistReduxState>) {
            return action.payload
        }
    }
})

export const { setPlaylist } = playlistSlice.actions

export default playlistSlice