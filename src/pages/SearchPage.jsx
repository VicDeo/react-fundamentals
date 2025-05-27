import { useState, useEffect } from 'react'
import { search, update, getAll } from '../api/booksAPI'
import { Link } from 'react-router-dom'
import BookShelf from '../components/BookShelf.jsx'

const SearchPage = ({shelves, noneShelf}) => {
  const [books, setBooks] = useState([])
  const [searchStr, setSearchStr] = useState('')
  useEffect( () => {
    let unmounted = false;
    const getBooks = async () => {
      if (unmounted) {
          return;
      }
      if (!searchStr) {
        setBooks([]);
        return;
      }
      const searchRes = await search(searchStr, 20);

      // TODO: Fix backend inconsistency so the search results have shelf info ;-)
      const getAllRes = await getAll();
      const shelfMap = new Map(getAllRes.map(book => [book.id, book.shelf]));

      // Enrich search results with shelf info if available
      const merged = Array.isArray(searchRes)
        ? searchRes.map(book => ({
            ...book,
            shelf: shelfMap.get(book.id) || noneShelf.key,
          }))
        : [];

      setBooks(merged);
    };
    getBooks();
    return () => unmounted = true;
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
