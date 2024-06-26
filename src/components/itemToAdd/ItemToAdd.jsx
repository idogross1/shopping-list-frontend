import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ItemToAdd = ({ item, updateItemQuantity }) => {
    const [quantity, setQuantity] = useState(0);

    const handleUpdateItemQuantity = (event, num) => {
        event.stopPropagation();

        setQuantity(prevQuantity => {
            if (num === 0) {
                return 0;
            } else {
                return prevQuantity + num;
            }
        });
    };

    useEffect(() => {
        updateItemQuantity(item, quantity);
    }, [item, quantity, updateItemQuantity]);

    return (
        <li onClick={(event) => handleUpdateItemQuantity(event, 1)}>
            <span>{item.name}</span>
            {quantity === 1 && (
                <span onClick={(event) => handleUpdateItemQuantity(event, 0)}>X</span>
            )}
            {quantity > 1 && (
                <span>
                    <span>{quantity}</span>
                    <span onClick={(event) => handleUpdateItemQuantity(event, -1)}>-</span>
                </span>
            )}
        </li>
    );
};

ItemToAdd.propTypes = {
    item: PropTypes.object.isRequired,
    updateItemQuantity: PropTypes.func.isRequired
};

export default ItemToAdd;
