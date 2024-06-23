import { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ItemsMenu from '../../components/itemsMenu/ItemsMenu'
import { debounce } from '../../services/utils.services';
import { updateList } from '../../features/list/listsSlice'
// import { fetchListById } from '../../features/list/listsSlice'; // Assume you have a thunk to fetch a single list by ID

const EditList = () => {
    const { listId } = useParams(); // Extract listId from the URL
    const dispatch = useDispatch();
    const [isItemsMenuOpen, setItemMenu] = useState(false);
    const [itemsToAddToList, setItemsToAddToList] = useState([]);

    const list = useSelector((state) =>
        state.lists.data.find((list) => list._id === listId)
    );

    const items = useSelector((state) => state.items.data);

    const handleAddProducts = () => {
        setItemMenu(true);
    }

    const closeItemsMenuHandler = () => {
        setItemMenu(false);
    }

    const debouncedUpdateListItems = useCallback(
        debounce((newItems) => {
            dispatch(updateList({ listId, items: newItems }));
        }, 500), // Adjust the delay as needed
        [dispatch, listId]
    );

    useEffect(() => {
        console.log(itemsToAddToList)
    }, [itemsToAddToList])

    useEffect(() => {
        // Call the debounced function whenever itemsToAddToList changes
        debouncedUpdateListItems(itemsToAddToList);
    }, [itemsToAddToList, debouncedUpdateListItems]);

    const handleAddItemsToList = (item) => {
        setItemsToAddToList(prevItems => {
            const existingItem = prevItems.find(i => i._id === item._id);
            if (existingItem) {
                // Create a new array with the updated item
                return prevItems.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i);
            } else {
                // Add the new item to the array
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    if (!list) {
        return <div>Loading...</div>; // Show a loading state while the data is being fetched
    }

    return (
        <div>
            <pre>{JSON.stringify(list, null, 2)}</pre>

            <h1>{list.name}</h1>
            <pre>{JSON.stringify(itemsToAddToList, null, 2)}</pre>

            {!list.items.length &&
                <>
                    <h2>What do you need to buy?</h2>
                <h3>Start searching products to add them to your list</h3>
                    {!isItemsMenuOpen && <button type="button" onClick={handleAddProducts}>+ Add products</button>}
                </>
            }
            {isItemsMenuOpen && <ItemsMenu closeItemsMenuHandler={closeItemsMenuHandler} items={items} addItemsToList={handleAddItemsToList}></ItemsMenu>}
        </div >
    );
};

export default EditList;
