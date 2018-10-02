import React, { Component } from "react";
import Shelf from "../components/Shelf";
import Button from "../components/Button";
import Title from "../components/Title";
import { getAll, update } from "../BooksAPI";

export default class ScreenMain extends Component {
  state = { books: [] };

  // Retrieve latest book info, render if state is different
  componentDidMount = async () => {
    try {
      const getBooks = await getAll();
      this.setState({ books: getBooks });
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
      <div className="list-books">
        {/* Heading */}
        <Title />

        {/* Bookshelves */}
        <div className="list-books-content">
          <Shelf
            name="Currently Reading"
            shelf={this.state.books.filter(thisBook => thisBook.shelf === "currentlyReading")}
            updateShelf={this.updateShelf}
          />
          <Shelf
            name="Want to Read"
            shelf={this.state.books.filter(thisBook => thisBook.shelf === "wantToRead")}
            updateShelf={this.updateShelf}
          />
          <Shelf
            name="Read"
            shelf={this.state.books.filter(thisBook => thisBook.shelf === "read")}
            updateShelf={this.updateShelf}
          />
        </div>

        {/* Button to search page */}
        <Button />
      </div>
    );
  }
}
