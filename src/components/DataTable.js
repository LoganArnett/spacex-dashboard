import React, { Component } from 'react';
import LinkIcon from '../assets/images/link.svg';

class DataTable extends Component {
  render() {
    console.log(this.props)
    const { articles } = this.props;
    return (
      <table className="table container">
        <thead>
          <tr>
            <th>Badge</th>
            <th>Rocket Name</th>
            <th>Rocket Type</th>
            <th>Launch Date</th>
            <th>Details</th>
            <th>ID</th>
            <th>Article</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr>
              <td className="badge-icon">
                <img src={article.links.mission_patch} alt="mission_patch"/>
              </td>
              <td>{article.rocket.rocket_name}</td>
              <td>{article.rocket.rocket_type}</td>
              <td>{article.launch_date_utc}</td>
              <td>{article.details}</td>
              <td>{article.flight_number}</td>
              <td className="badge-icon">
                <a href={article.links.article_link}>
                  <img src={LinkIcon} alt="link"/>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default DataTable;