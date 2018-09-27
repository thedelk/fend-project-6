import React from "react";
// import * as BooksAPI from './BooksAPI'
import { BrowserRouter as Router, Route } from "react-router-dom";
import ScreenMain from "./screens/ScreenMain";
import ScreenSearch from "./screens/ScreenSearch";
import "./App.css";

class BooksApp extends React.Component {
  state = {};

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <ScreenMain />} />
        <Route path="/search" render={() => <ScreenSearch />} />
      </div>
    );
  }
}

export default BooksApp;
