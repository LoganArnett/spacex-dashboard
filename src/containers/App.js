import React, { Component } from 'react';
import axios from 'axios';
import { Header, DataTable, TableControls } from '../components'
import '../scss/App.scss';

class App extends Component {
  state = {
    articles: []
  }
  componentDidMount() {
    this.getArticles();
  }
  getArticles = () => {
    axios.get('https://api.spacexdata.com/v2/launches')
    .then(({ data }) => this.setState({ articles: data }));
  }
  refresh = () => {
    this.setState({ articles: [] }, () => this.getArticles());
  }
  render() {
    const { articles } = this.state;
    return (
      <section className="App">
        <Header title="SpaceX Launches" />
        <section className="Main container">
          <TableControls refresh={this.refresh} />
          { articles.length ? <DataTable articles={articles} /> : <h2 className="loading">Loading...</h2>}
        </section>
      </section>
    );
  }
}

export default App;
