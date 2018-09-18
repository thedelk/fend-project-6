import React from 'react'
import PageMain from './PageMain';
import PageSearch from './PageSearch';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  render() {
    return (
      <div className="app">
        <PageMain
          books={this.state.books}
        />
      </div>
    )
  }
}

export default BooksApp
