import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Book from "./Book";
import Bookshelf from "./Bookshelf";
// import * as BooksAPI from "../BooksAPI";
import { getAll, update } from "../BooksAPI";

export default class PageMain extends Component {
  // NEW
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    getAll().then(books => this.setState({ books: books }));
  }

  // Copied!
  updateHandler(book, shelf) {
    this.moveBook(book, shelf);
    update(book, shelf).then(() => console.log("Book update done"));
    // ^ takes a lot of time so better for checking
  }

  // Copied!
  moveBook = (book, shelf) => {
    let books = this.state.books;
    books.forEach((oldBook, i) => {
      if (oldBook.id === book.id) {
        books[i].shelf = shelf;
      }
    });
    this.setState({ books: books });
  };

  filterBooks(shelf) {
    return this.state.books.filter(book => book.shelf === shelf);
  }

  // Existing
  render() {
    // console.log(this.props.books);
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              name="Currently Reading"
              books={this.filterBooks("currentlyReading")}
              handler={this.updateHandler.bind(this)}
            />
            <Bookshelf
              name="Want to Read"
              books={this.filterBooks("wantToRead")}
              handler={this.updateHandler.bind(this)}
            />
            <Bookshelf
              name="Read"
              books={this.filterBooks("read")}
              handler={this.updateHandler.bind(this)}
            />
            {/* "Currently Reading" bookshelf */}
            {/* <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books
                    .filter(book => book.shelf === "currentlyReading")
                    .map(book => (
                      // Display each book on the shelf it it made it out of the array
                      <li key={book.id}>
                        <Book
                          book={book}
                          moveShelf={this.props.moveShelf}
                          currentShelf="currentlyReading"
                        />
                      </li>
                    ))}
                </ol>
              </div>
            </div> */}
            {/* "Want to Read" bookshelf */}
            {/* <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books
                    .filter(book => book.shelf === "wantToRead")
                    .map(book => (
                      <li key={book.id}>
                        <Book
                          book={book}
                          moveShelf={this.props.moveShelf}
                          currentShelf="wantToRead"
                        />
                      </li>
                    ))}
                </ol>
              </div>
            </div> */}
            {/* "Read" bookshelf */}
            {/* <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books
                    .filter(book => book.shelf === "read")
                    .map(book => (
                      <li key={book.id}>
                        <Book
                          book={book}
                          moveShelf={this.props.moveShelf}
                          currentShelf="read"
                        />
                      </li>
                    ))}
                </ol>
              </div>
            </div> */}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}
