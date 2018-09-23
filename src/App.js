// Credit given to Maeva's instruction, without which I would be lost
// https://www.youtube.com/watch?v=i6L2jLHV9j8&t=2953s&list=PLq2plN5uyLIVHGcB-OT1ra9asp-anLH2E&index=4

import React from "react";
import { Route } from "react-router-dom";
import PageMain from "./components/PageMain";
import PageSearch from "./components/PageSearch";
import "./css/App.css";

export default class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <PageMain />} />
        <Route path="/search" render={() => <PageSearch />} />
      </div>
    );
  }
}
