// Credit given to Maeva's instruction, without which I would be lost
// https://www.youtube.com/watch?v=i6L2jLHV9j8&t=2953s&list=PLq2plN5uyLIVHGcB-OT1ra9asp-anLH2E&index=4

import React from "react";
import PageMain from "./PageMain";
import PageSearch from "./PageSearch";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  }

  moveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);

    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  };

  render() {
    return (
      <div className="app">
        <PageMain books={this.state.books} moveShelf={this.moveShelf} />
      </div>
    );
  }
}

export default BooksApp;
