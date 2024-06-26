import PropTypes from 'prop-types';
import ItemToAdd from '../itemToAdd/ItemToAdd';
import { useCallback } from 'react';

const ItemsMenu = ({ closeItemsMenuHandler, updateItemQuantityInList, items }) => {
    const updateItemQuantity = useCallback((item, quantity) => {
        updateItemQuantityInList(item, quantity);
    }, [updateItemQuantityInList]);

    return (
        <section>
            <div className="">
                <p>Add products</p>
                <button onClick={closeItemsMenuHandler}>X</button>
            </div>
            <div>
                SEARCH BAR
            </div>
            <ul className="">
                {items.map((item, index) => (
                    <ItemToAdd key={index} item={item} updateItemQuantity={updateItemQuantity} />
                ))}
            </ul>
        </section>
    );
};

ItemsMenu.propTypes = {
    closeItemsMenuHandler: PropTypes.func.isRequired,
    updateItemQuantityInList: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired
};

export default ItemsMenu;
