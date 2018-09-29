import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAll, update, search } from "../BooksAPI";

import Book from "../components/Book";

export default class ScreenSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      queryResults: [],
      queryString: ""
    };
  }

  // state = {
  //   books: [],
  //   queryResults: [],
  //   queryString: ""
  // };

  async componentDidMount() {
    try {
      const getBooks = await getAll();
      this.setState({ books: getBooks });
      // console.log(this.state);
    } catch (error) {
      console.log(error);
    }
  }

  updateQuery = queryString => {
    this.setState({ queryString: queryString }, this.submitSearch);
    // console.log(queryString);
  };

  // TODO: Customize this
  submitSearch() {
    if (this.state.queryString === "" || this.state.queryString === undefined) {
      return this.setState({ queryResults: [] });
    }
    search(this.state.queryString.trim()).then(res => {
      // console.log(res);
      if (res.error) {
        return this.setState({ queryResults: [] });
      } else {
        res.forEach(b => {
          let f = this.state.books.filter(B => B.id === b.id);
          if (f[0]) {
            b.shelf = f[0].shelf;
          }
        });
        return this.setState({ queryResults: res });
      }
    });
  }

  // TODO: Customize this
  updateShelf = (book, shelf) => {
    update(book, shelf).then(response => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
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
            {this.state.queryResults.map((item, key) => (
              <Book key={key} book={item} updateShelf={this.updateShelf} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
