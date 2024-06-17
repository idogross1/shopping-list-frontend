// src/app/rootReducer.js
import { combineReducers } from 'redux';
// import itemsReducer from '../features/items/itemsSlice';
import listsReducer from '../features/list/listsSlice';
// import usersReducer from '../features/users/usersSlice';

const rootReducer = combineReducers({
    //   items: itemsReducer,
    lists: listsReducer,
    //   users: usersReducer,
});

export default rootReducer;
