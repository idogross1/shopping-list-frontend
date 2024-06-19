import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ItemsMenu from '../../components/itemsMenu/ItemsMenu'
import { debounce } from '../../services/utils.services';

// import { fetchListById } from '../../features/list/listsSlice'; // Assume you have a thunk to fetch a single list by ID

const EditList = () => {
    const { listId } = useParams(); // Extract listId from the URL
    const dispatch = useDispatch();
    const [isItemsMenuOpen, setItemMenu] = useState(false);
    const list = useSelector((state) =>
        state.lists.data.find((list) => list._id === listId)
    );

    const items = useSelector((state) => {
        console.log("🚀 ~ items ~ state:", state);
        console.log("🚀 ~ items ~ state:", state.items);
        return state.items.data
    });

    // useEffect(() => {
    //     if (!list) {
    //         dispatch(fetchListById(listId)); // Fetch the list data if it's not already in the store
    //     }
    // }, [dispatch, listId, list]);

    const handleAddProducts = () => {
        setItemMenu(true);
    }

    const closeItemsMenuHandler = () => {
        setItemMenu(false);
    }

    if (!list) {
        return <div>Loading...</div>; // Show a loading state while the data is being fetched
    }

    return (
        <div>
            <h1>{list.name}</h1>
            {!list.items.length &&
                <>
                    <h2>What do you need to buy?</h2>
                    <h3>Start searching products to add them to your list</h3>
                    <pre>{isItemsMenuOpen}</pre>
                    {!isItemsMenuOpen && <button type="button" onClick={handleAddProducts}>+ Add products</button>}
                </>
            }
            {isItemsMenuOpen && <ItemsMenu closeItemsMenuHandler={closeItemsMenuHandler} items={items}></ItemsMenu>}
        </div >
    );
};

export default EditList;
