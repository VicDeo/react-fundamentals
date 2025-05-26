import Book from './Book'
import MoveTo from './MoveTo'

const BookShelf = ({title, books, shelves, handleShelfChange}) => {
  return (
    <div className="book-shelf">
    <h2 className="book-shelf-title" >{title}</h2>
    <div className="book-shelf-list">
      {
        books.map((book) => 
          <div className="book-shelf-container" key={book.id}>
            <Book book={book} shelves={shelves} />
            <MoveTo shelves={shelves} book={book} handleShelfChange={handleShelfChange} />
          </div>
        )
      }
      {books.length === 0 && <span>No books so far</span>}
    </div>
    </div>
  );
}

export default BookShelf
