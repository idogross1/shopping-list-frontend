import { useState, useRef } from "react"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewList } from '../../features/list/listsSlice';

export const AddNewList = () => {
    const [isFormOpend, setFormOpened] = useState(false);
    const listNameRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOpenForm = () => {
        setFormOpened(!isFormOpend);
    }

    const addListHandler = async (event) => {
        event.preventDefault();
        const listName = listNameRef.current.value;
        if (listName.trim()) {
            const resultAction = await dispatch(addNewList({ name: listName }));
            if (addNewList.fulfilled.match(resultAction)) {
                const newList = resultAction.payload;
                setFormOpened(false);
                navigate(`/${newList._id}`); // Navigate to the new page
            }
        }
    }

    const cancelHandler = () => {
        setFormOpened();
    }

    return (
        <>
            <button onClick={handleOpenForm}>add new list</button>
            {isFormOpend &&
                <form onSubmit={addListHandler}>
                    <label htmlFor="name">Create a new list</label>
                    <input type="text" placeholder="New list" ref={listNameRef} />
                    <button type="button" onClick={cancelHandler}>Cancel</button>
                    <button type="submit">Create</button>
                </form>}
        </>
    )
}