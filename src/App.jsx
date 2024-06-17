import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import './App.css'
import ShoppingList from './components/ShoppingList/ShoppingList'
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
