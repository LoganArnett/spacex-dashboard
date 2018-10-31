import React, { Component } from 'react';
import axios from 'axios';
import shuffle from 'lodash/shuffle';
import find from 'lodash/find';
import filter from 'lodash/filter';
import { Header, DataTable, TableControls } from '../components'
import '../scss/App.scss';

class App extends Component {
  state = {
    articles: [],
    filteredArticles: [],
    filters: {
      landed: false,
      reused: false,
      reddit: false
    }
  }
  componentDidMount() {
    this.getArticles();
  }
  getArticles = () => {
    axios.get('https://api.spacexdata.com/v2/launches')
    .then(({ data }) => {
      const articles = shuffle(data);
      this.setState({ articles, filteredArticles: articles })
    });
  }
  refresh = () => {
    this.setState({ articles: [], filteredArticles: [] }, () => this.getArticles());
  }
  filterBy = (name) => {
    const filters = Object.assign(this.state.filters, { [name]: !this.state.filters[name] });
    const filteredArticles = this.filterArticles(filters);
    return this.setState({ filters, filteredArticles });
  }
  filterArticles = (filters) => {
    console.log(filters)
    const { landed, reused, reddit } = filters;
    const { filteredArticles, articles } = Object.assign({}, this.state);
    var updatedArticles = [];
    if (landed) {
      updatedArticles = filter(articles, article => {
        return article.rocket.first_stage.cores[0].land_success;
      });
    }
    if (reused) {
      updatedArticles = filter(updatedArticles.length ? updatedArticles : articles, article => {
        return article.rocket.first_stage.cores[0].reused;
      });
    }
    if (reddit) {
      updatedArticles = filter(updatedArticles.length ? updatedArticles : articles, article => {
        return find(Object.keys(article.links), key => key.includes('reddit'));
      });
    }
    return updatedArticles.length ? updatedArticles : articles;
  }
  render() {
    const { filteredArticles, filters } = this.state;
    return (
      <section className="App">
        <Header title="SpaceX Launches" />
        <section className="Main container">
          <TableControls refresh={this.refresh} filterBy={this.filterBy} filters={filters} />
          { filteredArticles.length ? <DataTable articles={filteredArticles} /> : <h2 className="loading">Loading...</h2>}
        </section>
      </section>
    );
  }
}

export default App;
