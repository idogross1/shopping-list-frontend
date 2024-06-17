import classes from './ShoppingList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, getLists, fetchLists } from '../../features/list/listsSlice.js';
import { useEffect } from 'react';
const ShoppingList = () => {

    const lists = useSelector(state => state.lists);
    console.log("🚀 ~ ShoppingList ~ lists:", lists);

    return (
        <>
            <h1 className={classes.h1}>{JSON.stringify(lists)}</h1>
        </>
    );
}

export default ShoppingList;