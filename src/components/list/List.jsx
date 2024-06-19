import propTypes from 'prop-types';

export const List = ({ list, editList }) => {
    const handleEditList = () => {
        editList(list._id)
    }
    console.log("🚀 ~ List ~ list:", list);
    return <li onClick={handleEditList}>{list.name}</li>
}

List.propTypes = {
    list: propTypes.object.isRequired,
    editList: propTypes.func.isRequired
}

export default List