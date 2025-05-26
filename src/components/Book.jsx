const Book = ({book, shelves}) => {
  return (
    <div className="book-data">
      {book.imageLinks?.smallThumbnail && <img height="140px" src={book.imageLinks.smallThumbnail} />}
      <div>{book.title}</div>
      <div className="book-authors">{book.authors?.join(', ')}</div>
    </div>
  );
}

export default Book
