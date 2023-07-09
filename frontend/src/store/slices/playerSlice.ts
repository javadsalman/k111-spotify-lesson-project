import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ISong } from "../../types";

interface IPlayerReduxState {
    volume: number
    currentSong: ISong|null
    playing: boolean
}

const initialState: IPlayerReduxState = {
    volume: 0,
    currentSong: null,
    playing: false,
}

const playerSlice = createSlice({
    name: 'playerSlice',
    initialState: initialState,
    reducers: {
        addSong(state, action: PayloadAction<ISong>) {
            state.currentSong = action.payload
        },
        setPlaying(state, action: PayloadAction<boolean>) {
            state.playing = action.payload
        },
        setVolume(state, action: PayloadAction<number>) {
            state.volume = action.payload
        }
    }
})

export const { addSong } = playerSlice.actions

export default playerSlice