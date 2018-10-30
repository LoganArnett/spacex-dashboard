import React, { Component } from 'react';
import axios from 'axios';
import { Header, DataTable } from '../components'
import '../scss/App.scss';

class App extends Component {
  state = {
    articles: []
  }
  componentDidMount() {
    axios.get('https://api.spacexdata.com/v2/launches')
    .then(({ data }) => this.setState({ articles: data }));
  }
  render() {
    const { articles } = this.state;
    return (
      <section className="App">
        <Header title="SpaceX Launches" />
        <DataTable articles={articles} />
      </section>
    );
  }
}

export default App;
