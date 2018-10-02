import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAll, update, search } from "../BooksAPI";

import Book from "../components/Book";

export default class ScreenSearch extends Component {
  state = {
    books: [],
    queryResults: [],
    queryString: ""
  };

  // Retrieve latest book info, render if state is different
  componentDidMount = async () => {
    try {
      const getBooks = await getAll();
      this.setState({ books: getBooks });
    } catch (error) {
      console.log(error);
    }
  };

  // Get the search text, then perform the search against it
  updateQuery = queryString => {
    this.setState({ queryString: queryString }, this.submitSearch);
  };

  // Execute search
  submitSearch = async () => {
    // Prevent leading and trailing spaces from being included in query
    let query = this.state.queryString.trim();

    // Ignore empty or undefined queries
    if (query === "" || query === undefined) {
      return this.setState({ queryResults: [] });
    }

    try {
      const getResults = await search(query);

      // Loop through each result
      getResults.forEach(searchedBook => {
        // Store searchedBook and set equal to book from this.state if "id" matches
        // If "id" doesn't match, variable will be an empty array
        // Credit goes to Ryan Waite: https://www.youtube.com/watch?v=acJHkd6K5kI
        let tempBook = this.state.books.filter(
          myBooks => myBooks.id === searchedBook.id
        );

        // If array has any elements (meaning: if any searched books are on a shelf),
        // set the "shelf" value to that of the book in this.state
        if (tempBook[0]) {
          searchedBook.shelf = tempBook[0].shelf;
        }
      });
      this.setState({ queryResults: getResults });
    } catch (error) {
      console.log(error);
    }
  };

  // If a book's shelf changes, update state
  updateShelf = async (book, shelf) => {
    try {
      await update(book, shelf);
      book.shelf = shelf;
      this.setState(book);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.queryString}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.queryResults.map((book, key) => (
              <Book key={key} book={book} updateShelf={this.updateShelf} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
