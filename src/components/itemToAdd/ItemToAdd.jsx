import PropTypes from 'prop-types';
const ItemToAdd = ({ item }) => {
    return <li>
        <pre>{JSON.stringify(item, null, 2)}</pre>
    </li>
}

ItemToAdd.propTypes = {
    item: PropTypes.object.isRequired
}

export default ItemToAdd