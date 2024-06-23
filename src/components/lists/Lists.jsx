import propTypes from 'prop-types';
import List from '../list/List';

export const Lists = ({ lists }) => {
    return <ul>
        {lists.data.length &&
            lists.data.map((list, index) => <List key={index} list={list}></List>)}
    </ul>
}

Lists.propTypes = {
    lists: propTypes.object.isRequired
}

export default Lists