import React, { Component } from "react";
import Shelf from "../components/Shelf";
import { getAll, update } from "../BooksAPI";
import { Link } from "react-router-dom";

export default class ScreenMain extends Component {
  state = { books: [] };

  async componentDidMount() {
    try {
      const getBooks = await getAll();
      this.setState({ books: getBooks });
    } catch (error) {
      console.log(error);
    }
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

  // TODO: Customize Shelf props
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Shelf
            name="Currently Reading"
            shelf={this.state.books.filter(b => b.shelf === "currentlyReading")}
            updateShelf={this.updateShelf}
          />
          <Shelf
            name="Want to Read"
            shelf={this.state.books.filter(b => b.shelf === "wantToRead")}
            updateShelf={this.updateShelf}
          />
          <Shelf
            name="Read"
            shelf={this.state.books.filter(b => b.shelf === "read")}
            updateShelf={this.updateShelf}
          />
        </div>
        <div className="open-search">
          <Link to="/search">
            Add a book
          </Link>
        </div>
      </div>
    );
  }
}
