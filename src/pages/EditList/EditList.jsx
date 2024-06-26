import { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ItemsMenu from '../../components/itemsMenu/ItemsMenu';
import { debounce } from '../../services/utils.services';
import { updateList } from '../../features/list/listsSlice';

const EditList = () => {
    const { listId } = useParams(); // Extract listId from the URL
    const dispatch = useDispatch();
    const [isItemsMenuOpen, setItemMenu] = useState(false);
    const [itemsInList, setItemsInList] = useState([]);

    const list = useSelector((state) =>
        state.lists.data.find((list) => list._id === listId)
    );

    const items = useSelector((state) => state.items.data);

    const handleAddProducts = () => {
        setItemMenu(true);
    };

    const closeItemsMenuHandler = () => {
        setItemMenu(false);
    };

    const debouncedUpdateListItems = useCallback(
        debounce((newItems) => {
            dispatch(updateList({ listId, items: newItems }));
        }, 500), // Adjust the delay as needed
        [dispatch, listId]
    );

    useEffect(() => {
        // Call the debounced function whenever itemsInList changes
        debouncedUpdateListItems(itemsInList);
    }, [itemsInList, debouncedUpdateListItems]); // Add itemsInList as a dependency

    const updateItemQuantityInList = useCallback((item, quantity) => {
        setItemsInList(prevItems => {
            const existingItemIndex = prevItems.findIndex(i => i._id === item._id);

            if (existingItemIndex !== -1) {
                if (quantity !== 0) {
                    return prevItems.map((i, index) =>
                        index === existingItemIndex ? { ...i, quantity } : i
                    );
                } else {
                    return prevItems.filter((i, index) => index !== existingItemIndex);
                }
            } else {
                return [...prevItems, { ...item, quantity }];
            }
        });
    }, []);

    if (!list) {
        return <div>Loading...</div>; // Show a loading state while the data is being fetched
    }

    return (
        <div>
            <pre>{JSON.stringify(list, null, 2)}</pre>

            <h1>{list.name}</h1>
            <pre>itemsInList</pre>
            <pre>{JSON.stringify(itemsInList, null, 2)}</pre>
            <pre>itemsInList filtered</pre>
            <pre>{JSON.stringify(itemsInList.filter(i => i.quantity), null, 2)}</pre>
            <pre>items in list state</pre>
            <pre>{JSON.stringify(list.items, null, 2)}</pre>

            {!list.items.length && !isItemsMenuOpen &&
                <>
                    <h2>What do you need to buy?</h2>
                <h3>Start searching products to add them to your list</h3>
                </>
            }
            {!isItemsMenuOpen && <button type="button" onClick={handleAddProducts}>+ Add products</button>}
            {isItemsMenuOpen && <ItemsMenu closeItemsMenuHandler={closeItemsMenuHandler} items={items} updateItemQuantityInList={updateItemQuantityInList}></ItemsMenu>}
        </div>
    );
};

export default EditList;
