// import classes from './ShoppingList.module.css';
import { useSelector } from 'react-redux';
import Lists from '../../components/lists/Lists';
import { AddNewList } from '../../components/addNewList/AddNewList';

const ShoppingList = () => {

    const lists = useSelector(state => state.lists);
    // console.log("🚀 ~ ShoppingList ~ lists:", lists);

    return (
        <>
            <AddNewList />
            <Lists lists={lists} />
        </>
    );
}

export default ShoppingList;