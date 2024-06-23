import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// TODO: clean file from  the list slice
// Async thunk to fetch lists from an API
export const fetchLists = createAsyncThunk('lists/fetchLists', async () => {
    const response = await axios.get('http://localhost:3000/list/ncsidjnc');
    return response.data;
});

// Async thunk to fetch lists from an API
export const addNewList = createAsyncThunk('lists/addNewList', async (newList) => {
    const response = await axios.post('http://localhost:3000/list', newList);
    return response.data;
});

const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        data: [{ _id: 'sdkcmsdc', name: 'milk' }, { _id: 'cawehjbcj', name: 'bread' }],
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
        getListById: (state) => {
            return state.filter(list => list)
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchLists.pending, (state) => {
    //             state.status = 'loading';
    //         })
    //         .addCase(fetchLists.fulfilled, (state, action) => {
    //             console.log("🚀 ~ .addCase ~ action:", action);
    //             state.status = 'succeeded';
    //             state.data = action.payload;
    //         })
    //         .addCase(fetchLists.rejected, (state, action) => {
    //             state.status = 'failed';
    //             state.error = action.error.message;
    //         });

    //     builder
    //         .addCase(addNewList.pending, (state) => {
    //             state.status = 'loading';
    //         })
    //         .addCase(addNewList.fulfilled, (state, action) => {
    //             console.log("🚀 ~ .addCase ~ action:", action);
    //             state.status = 'succeeded';
    //             state.data.push(action.payload);
    //         })
    //         .addCase(addNewList.rejected, (state, action) => {
    //             state.status = 'failed';
    //             state.error = action.error.message;
    //         });
    // },
});
export const { addItem, removeItem, getLists } = itemsSlice.actions;
export default itemsSlice.reducer;
