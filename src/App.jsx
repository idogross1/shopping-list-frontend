import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import './App.css'
import ShoppingList from './pages/ShoppingList/ShoppingList.jsx'
import EditList from './pages/EditList/EditList.jsx'
import { fetchLists } from './features/list/listsSlice.js';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLists());
    // dispatch(fetchItems());
    // dispatch(fetchUsers());
  }, [dispatch]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShoppingList />} />
        <Route path='/:listId' element={<EditList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
