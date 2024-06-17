import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch lists from an API
export const fetchLists = createAsyncThunk('lists/fetchLists', async () => {
    const response = await axios.get('http://localhost:3000/list/ncsidjnc');
    return response.data;
});

const itemsSlice = createSlice({
    name: 'lists',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        addItem: (state, action) => {
            state.push(action.payload);
        },
        removeItem: (state, action) => {
            return state.filter((_, index) => index !== action.payload);
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchLists.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(fetchLists.fulfilled, (state, action) => {
                    console.log("🚀 ~ .addCase ~ action:", action);
                    state.status = 'succeeded';
                    state.data = action.payload;
                })
                .addCase(fetchLists.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                });
        },

    }
});
export const { addItem, removeItem, getLists } = itemsSlice.actions;
export default itemsSlice.reducer;
