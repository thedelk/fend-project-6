import React, { Component } from "react";
import Book from "./Book";

export default class Shelf extends Component {
  async componentDidMount() {
    try {
      console.log(this);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.name}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.props.shelf.map((book, key) => (
                <Book key={key} book={book} updateShelf={this.props.updateShelf} />
                ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
