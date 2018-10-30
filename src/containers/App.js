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
  render() {
    const { articles } = this.state;
    return (
      <section className="App">
        <Header title="SpaceX Launches" />
        <TableControls />
        <DataTable articles={articles} />
      </section>
    );
  }
}

export default App;
