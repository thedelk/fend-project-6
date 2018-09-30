// Credit for demonstrating this technique goes to Forrest Walker
// https://youtu.be/bpKI3R0nf7E

import React, { Component } from "react";
const BookContext = React.createContext(defaultValue);

export default class BookProvider extends Component {
  state = {
    books: [],
    shelfReading: [],
    shelfWant: [],
    shelfRead: [],
  };

  render() {
    return (
      <BookContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </BookContext.Provider>
    );
  }
}
