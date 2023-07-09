import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type colorTypes = 'success' | 'error' | 'info' | 'warning'

interface INotfReduxState {
    open: boolean
    message: string
    color: colorTypes
    duration: number
}

const initialState: INotfReduxState = {
    open: false,
    message: '',
    color: 'info',
    duration: 6000
}

const notfSlice = createSlice({
    name: 'notfSlice',
    initialState: initialState,
    reducers: {
        setNotf(state, action:PayloadAction<{message: string, color?: colorTypes, duration?: number}>) {
            state.open = true
            state.message = action.payload.message
            if (action.payload.color) 
                state.color = action.payload.color
            if (action.payload.duration)
                state.duration = action.payload.duration
        },
        removeNotf() {
            return initialState
        }
    }
})

export const { setNotf, removeNotf } = notfSlice.actions

export default notfSlice