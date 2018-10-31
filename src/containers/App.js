import React from 'react';
import axios from 'axios';
import shuffle from 'lodash/shuffle';
import find from 'lodash/find';
import filter from 'lodash/filter';
import { Header, DataTable, TableControls } from '../components'
import '../scss/App.scss';

class App extends React.Component {
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
  getArticles = async () => {
    const { data } = await axios.get('https://api.spacexdata.com/v2/launches');
    const articles = shuffle(data);
    this.setState({ articles, filteredArticles: this.filterArticles({ articles }) });
  }
  refresh = () => {
    this.setState({ articles: [], filteredArticles: [] }, () => this.getArticles());
  }
  filterBy = (name) => {
    const filters = Object.assign(this.state.filters, { [name]: !this.state.filters[name] });
    return this.setState({ filters, filteredArticles: this.filterArticles({ filters }) });
  }
  filterArticles = (options) => {
    const { landed, reused, reddit } = options.filters ? options.filters : this.state.filters;
    const { articles } = options.articles ? options : Object.assign({}, this.state);
    var updatedArticles = [];

    if (landed) {
      updatedArticles = filter(articles, article => article.rocket.first_stage.cores[0].land_success);
    }
    if (reused) {
      updatedArticles = filter(updatedArticles.length ? updatedArticles : articles, article => (
        article.rocket.first_stage.cores[0].reused
      ));
    }
    if (reddit) {
      updatedArticles = filter(updatedArticles.length ? updatedArticles : articles, article => (
        find(Object.keys(article.links), key => key.includes('reddit')
      )));
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