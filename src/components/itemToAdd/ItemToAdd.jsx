import propTypes from 'prop-types';
const ItemToAdd = ({ item, addItem }) => {
    const handleAddItemToList = (item) => {
        addItem(item)
    }

    return <li onClick={() => handleAddItemToList(item)}>
        <span>{item.name}</span>
    </li>
}

ItemToAdd.propTypes = {
    item: propTypes.object.isRequired,
    addItem: propTypes.func.isRequired
}

export default ItemToAdd