import React, { Component } from "react";
import Shelf from "../components/Shelf";
import Button from "../components/Button";
import Title from "../components/Title";
import { getAll, update } from "../BooksAPI";
// import { Link } from "react-router-dom";

export default class ScreenMain extends Component {
  state = { books: [] };

  // Retrieve latest book info, render if state is different
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
        <Title />
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
        <Button />
      </div>
    );
  }
}
