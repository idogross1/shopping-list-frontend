import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch lists from an API
export const fetchLists = createAsyncThunk('lists/fetchLists', async () => {
    const response = await axios.get('http://localhost:3000/list/ncsidjnc');
    console.log("🚀 ~ fetchLists ~ response.data:", response.data);
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
                // console.error(List with id ${listId} not found);
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
                state.status = 'succeeded';
                const { _id, items } = action.payload; // return from backend
                const list = state.data.find(list => list._id === _id); // list from local state
                if (list) {
                    const updatedList = mergeItemLists(list.items, items);
                    list.items = updatedList;
                } else {
                    console.error(`List with id ${_id} not found`);
                }
            })
            .addCase(updateList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

const mergeItemLists = (oldList, newList) => {
    // Create a map from the new list for quick lookup
    const newListMap = new Map(newList.map(item => [item._id, item]));

    // Update or remove items in the old list
    const updatedOldList = oldList.reduce((acc, item) => {
        const newItem = newListMap.get(item._id);
        if (newItem) {
            // Item exists in both lists, update its quantity
            acc.push({ ...item, quantity: newItem.quantity });
            // Remove the item from the new list map to keep track of processed items
            newListMap.delete(item._id);
        }
        // If the item is not in the new list, it means it has been removed, so don't add it to acc
        return acc;
    }, []);

    // Add remaining new items that were not in the old list
    newListMap.forEach(item => {
        updatedOldList.push(item);
    });

    return updatedOldList;
}


export const { addItem, removeItem, getLists, updateListItems } = listsSlice.actions;
export default listsSlice.reducer;

