import { useState, useEffect, useRef } from 'react'

const MoveBook = ({shelves, book, handleShelfChange}) => {
    const [selectVisible, setSelectVisible] = useState(false);
    const selectRef = useRef(null);
    const handleChange = (evt) => {
      handleShelfChange(book, evt.target.value);
      setSelectVisible(false);
    };
    const handleClick = (evt) => {
      setSelectVisible(true);
    };
    const handleBlur = (evt) => {
      setSelectVisible(false);
    };
    useEffect(() => {
      if (selectVisible && selectRef.current) {
        selectRef.current.focus();
      }
    }, [selectVisible]);
    console.log(book)
    return (
      <div className="move-to">
        {selectVisible ? <select ref={selectRef} value={book.shelf ? book.shelf : 'none'} onChange={handleChange} onBlur={handleBlur}>
          <optgroup label="Move to...">
            {shelves.map((shelf) => <option disabled={book.shelf === shelf.key} key={shelf.key} value={shelf.key}>{shelf.title}</option>
            )}
          </optgroup>
        </select>
        : <div className="move-to-expand" onClick={handleClick}>&#x25BC;</div>}
      </div>
    );
};

export default MoveBook
