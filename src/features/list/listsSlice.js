import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const updateList = createAsyncThunk('lists/updateList', async (updatedList) => {
    const response = await axios.put(`http://localhost:3000/list/${updatedList.userId}`, updatedList);
    return response.data;
});

const listsSlice = createSlice({
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
        getListById: (state) => {
            return state.filter(list => list)
        },
        updateListItems: (state, action) => {
            const { listId, items } = action.payload;
            const list = state.data.find(list => list._id === listId);
            if (list) {
                items.forEach(newItem => {
                    const existingItem = list.items.find(item => item._id === newItem._id);
                    if (existingItem) {
                        existingItem.quantity = newItem.quantity;
                    } else {
                        list.items.push(newItem);
                    }
                });
            } else {
                console.error(`List with id ${listId} not found`);
            }
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLists.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLists.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchLists.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });

        builder
            .addCase(addNewList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addNewList.fulfilled, (state, action) => {
                // console.log("🚀 ~ .addCase ~ action:", action);
                state.status = 'succeeded';
                state.data.push(action.payload);
            })
            .addCase(addNewList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });

        builder
            .addCase(updateList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateList.fulfilled, (state, action) => {
                // console.log("🚀 ~ .addCase ~ action:", action);
                state.status = 'succeeded';
                const { listId, items } = action.payload;
                const list = state.data.find(list => list._id === listId);
                if (list) {
                    items.forEach(newItem => {
                        const existingItem = list.items.find(item => item._id === newItem._id);
                        if (existingItem) {
                            existingItem.quantity = newItem.quantity;
                        } else {
                            list.items.push(newItem);
                        }
                    });
                } else {
                    console.error(`List with id ${listId} not found`);
                }
            })
            .addCase(updateList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});
export const { addItem, removeItem, getLists, updateListItems } = listsSlice.actions;
export default listsSlice.reducer;
