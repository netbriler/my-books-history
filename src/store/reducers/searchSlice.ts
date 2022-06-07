import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

export interface SearchState {
    query: string | null;
    page: number;
    enable: boolean;
    isLoading: boolean;
}

const initialState: SearchState = {
    query: '',
    page: 1,
    enable: false,
    isLoading: false,
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
            state.page = 1;
            state.enable = action.payload.trim() !== '';
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setEnable: (state, action: PayloadAction<boolean>) => {
            state.enable = action.payload;
            state.enable = false;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
})

export const selectSearch = (state: RootState) => state.search;
export const selectSearchEnable = (state: RootState) => state.search.enable;
export const {setQuery, setPage, setEnable, setIsLoading} = searchSlice.actions;
export default searchSlice.reducer;
