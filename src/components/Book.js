import React, { Component } from "react";

export default class Book extends Component {
  render() {
    // Set variable to reduce repeat code in return()
    const { book, updateShelf } = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            {/* Display cover if present, otherwise display nothing */}
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${
                  book.imageLinks ? book.imageLinks.thumbnail : ""
                }")`
              }}
            />

            <div className="book-shelf-changer">
              <select
                value={book.shelf ? book.shelf : "none"}
                onChange={event => {
                  updateShelf(book, event.target.value);
                }}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>

          {/* List title if present, otherwise display static text */}
          <div className="book-title">
            {book.title ? book.title : <em>(No title listed)</em>}
          </div>

          {/* List author(s) if present, otherwise display static text */}
          <div className="book-authors">
            {book.authors ? (
              book.authors.join(", ")
            ) : (
              <em>(No author listed)</em>
            )}
          </div>
        </div>
      </li>
    );
  }
}
