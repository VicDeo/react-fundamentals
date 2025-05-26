import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAll, update } from '../api/booksAPI'
import BookShelf from '../components/BookShelf.jsx'

const MainPage = ({shelves, noneShelf}) => {
  const [groupedBooks, setGroupedBooks] = useState([])
  useEffect( () => {
    const getBooks = async () => {
      const res = await getAll();
      // Group books by shelf
      const grouped = res.reduce((books, book) => {
        const key = book.shelf;
        if (!books[key]) {
          books[key] = [];
        }
        books[key].push(book);
        return books;
      }, {});
      setGroupedBooks(grouped);
    };
    getBooks();
  }, []);

  const handleShelfChange = (book, newShelf) => {
    const oldShelf = book.shelf;
    const updatedBook = { ...book, shelf: newShelf };
    const updatedGroups = { ...groupedBooks };
    
    updatedGroups[oldShelf] = groupedBooks[oldShelf].filter((b) => b.id !== book.id);
    if (newShelf !== noneShelf.key) {
      if (!updatedGroups[newShelf]) updatedGroups[newShelf] = [];
      updatedGroups[newShelf].push(updatedBook);
    }
    setGroupedBooks(updatedGroups);
    update(book, newShelf);
  };
  
  return (
    <>
      <h1 className="header">My Reads</h1>
      {Object.keys(groupedBooks).map((groupKey) => {
          const shelf = shelves.filter((shelf)=>shelf.key === groupKey).pop();
          const books = groupedBooks[groupKey];
          return <BookShelf title={shelf.title} handleShelfChange={handleShelfChange} books={books} shelves={[...shelves, noneShelf]} key={groupKey} />
      })}
      <Link className="button-search" to="/search">+</Link>
    </>
  );
}

export default MainPage
