import PropTypes from 'prop-types';
import ItemToAdd from '../itemToAdd/ItemToAdd'
// import { useState } from "react";

const ItemsMenu = ({ closeItemsMenuHandler, items }) => {
    return <section>
        <div className="">
            <p>Add products</p>
            <button onClick={closeItemsMenuHandler}>X</button>
        </div>
        <div>
            SEARCH BAR
        </div>
        <ul className="">
            {items.map((item, index) => <ItemToAdd key={index} item={item}></ItemToAdd>)}
        </ul>
    </section>
}

ItemsMenu.propTypes = {
    closeItemsMenuHandler: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired
};

export default ItemsMenu;
