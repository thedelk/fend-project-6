import React, { Component } from "react";

class Book extends Component {
  handleBookUpdate(evt) {
    const shelf = evt.target.value;
    this.props.handler(this.props, shelf);
    // ^ fine sending this.props as only book.id is used for update
  }

  render() {
    const shelf = this.props.shelf ? this.props.shelf : "none";

    // let displayedThumbnail = this.props.book.imageLinks
    //   ? this.props.book.imageLinks.thumbnail
    //   : "";

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                // backgroundImage: `url("${displayedThumbnail}")`
                backgroundImage: `url("${
                  this.props.imageLinks ? this.props.imageLinks.thumbnail : ""
                }")`
              }}
            />
            <div className="book-shelf-changer">
              <select value={shelf} onChange={this.handleBookUpdate.bind(this)}>
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
          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{this.props.authors}</div>
        </div>
      </li>
    );
  }
}

export default Book;
