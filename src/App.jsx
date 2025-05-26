import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { get, getAll, update, search } from './api/booksAPI'
import MainPage from './pages/MainPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import { Route, Routes } from 'react-router-dom'
 
function App() {
  const shelves = [
    {'title': 'Currently Reading', 'key': 'currentlyReading'},
    {'title': 'Want To Read', 'key': 'wantToRead'},
    {'title': 'Read', 'key': 'read'},
  ];
  const noneShelf = {'title': 'None', 'key':'none'};
  
  return (
    <Routes>
      <Route exact path="/" element={<MainPage shelves={shelves} noneShelf={noneShelf} />} />
      <Route exact path="/search" element={<SearchPage shelves={shelves} noneShelf={noneShelf} />} />
    </Routes>
  );
}

export default App
