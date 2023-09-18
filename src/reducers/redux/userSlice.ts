import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { type IUser } from './UserInterface'

interface GlobalState {
    userData: IUser[] | null
    isLoading: boolean
    error: string | undefined
}

const initialState: GlobalState = {
    userData: null,
    isLoading: true,
    error: undefined,
}

/* ---------------------------------- Fetch --------------------------------- */
// Fetch Watches Data
const fetchWatchesGet = createAsyncThunk('fetchWatchesGet', async (fetchProps: { url: string; target: string }) => {
    const { url, target } = fetchProps
    const response = fetch(url)
        .then(async (res) => await res.json())
        .then((data) => {
            return data
        })
        .catch((error) => {
            console.log(error)
            throw error
        })
    return { response: await response, target }
})

/* ---------------------------------- Slice --------------------------------- */
const WatchSlice = createSlice({
    name: 'Person',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWatchesGet.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(fetchWatchesGet.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            switch (action.payload.target) {
                case 'watches':
                    state.watchesData = action.payload.response
                    break
                case 'brands':
                    state.brandsData = action.payload.response
                    break
                default:
                    break
            }
            // state.watchesData = action.payload
        })

        builder.addCase(fetchWatchesGet.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    },
})

export { fetchWatchesGet, type GlobalState }
export default WatchSlice.reducer
