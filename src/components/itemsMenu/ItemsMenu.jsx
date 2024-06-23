import propTypes from 'prop-types';
import ItemToAdd from '../itemToAdd/ItemToAdd'
// import { useState } from "react";

const ItemsMenu = ({ closeItemsMenuHandler, addItemsToList, items }) => {
    const addItem = (item) => {
        addItemsToList(item)
    }

    return <section>
        <div className="">
            <p>Add products</p>
            <button onClick={closeItemsMenuHandler}>X</button>
        </div>
        <div>
            SEARCH BAR
        </div>
        <ul className="">
            {items.map((item, index) => <ItemToAdd key={index} item={item} addItem={addItem}></ItemToAdd>)}
        </ul>
    </section>
}

ItemsMenu.propTypes = {
    closeItemsMenuHandler: propTypes.func.isRequired,
    addItemsToList: propTypes.func.isRequired,
    items: propTypes.array.isRequired
};

export default ItemsMenu;
