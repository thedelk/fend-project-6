import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ScreenMain from "./screens/ScreenMain";
import ScreenSearch from "./screens/ScreenSearch";
import "./App.css";

export default class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={ScreenMain} />
        <Route path="/search" component={ScreenSearch} />
      </div>
    );
  }
}
