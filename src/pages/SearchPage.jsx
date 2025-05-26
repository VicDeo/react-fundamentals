import { useState, useEffect } from 'react'
import { search, update } from '../api/booksAPI'
import { Link } from 'react-router-dom'
import BookShelf from '../components/BookShelf.jsx'

const SearchPage = ({shelves, noneShelf}) => {
  const [books, setBooks] = useState([])
  const [searchStr, setSearchStr] = useState('')
  useEffect( () => {
    const getBooks = async () => {
      let unmounted = false;
      if (unmounted) {
          return;
      }
      if (!searchStr) {
        setBooks([]);
        return;
      }
      const res = await search(searchStr, 20);
      setBooks(Array.isArray(res) ? res : []);
      return () => unmounted = true;
    };
    getBooks();
  }, [searchStr]);
  
  const handleChange = (evt) => {
    setSearchStr(evt.target.value)
  }

  const handleShelfChange = (book, newShelf) => {
    const updatedBooks = books.map(b => {
      if (b.id !== book.id) return b;

      // If shelf is 'none', remove the shelf property
      const { shelf, ...rest } = book;
      
      return newShelf === noneShelf.key
        ? rest // shelf is removed
        : { ...b, shelf: newShelf };
    });
    console.log(updatedBooks)
    setBooks(updatedBooks);
    update(book, newShelf);
  };
  
  return (
    <>
      <h1 className="header">Search</h1>
      <div className="search-navigation">
        <Link className="search-navigation-back" to="/">&#9664;</Link>
        <input placeholder="Search by title, author, or ISBN" value={searchStr} onChange={handleChange} />
      </div>
      <BookShelf title={"Search results"} handleShelfChange={handleShelfChange} books={books} shelves={[...shelves, noneShelf]} />
    </>
  );
}

export default SearchPage
