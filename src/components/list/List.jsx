import { useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';

export const List = ({ list }) => {
    const navigate = useNavigate();

    const handleEditList = () => {
        navigate(`/${list._id}`)
    }
    return <li onClick={handleEditList}>{list.name}</li>
}

List.propTypes = {
    list: propTypes.object.isRequired,
}

export default List