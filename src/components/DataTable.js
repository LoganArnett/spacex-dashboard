import React from 'react';
import { format } from 'date-fns';
import LinkIcon from '../assets/images/link.svg';
import '../scss/DataTable.scss';

class DataTable extends React.Component {
  render() {
    const { articles } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th className="has-text-centered">Badge</th>
            <th>Rocket Name</th>
            <th>Rocket Type</th>
            <th>Launch Date</th>
            <th>Details</th>
            <th>ID</th>
            <th className="has-text-centered">Article</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, i) => (
            <tr key={`row-${i}`}>
              <td className="has-text-centered">
                <img src={article.links.mission_patch} alt="mission_patch"/>
              </td>
              <td>{article.rocket.rocket_name}</td>
              <td>{article.rocket.rocket_type}</td>
              <td>{format(article.launch_date_utc, 'MM/DD/YYYY')}</td>
              <td className="details">
                <span>
                  {article.details ? article.details : 'No Details to Display'}
                </span>
              </td>
              <td>{article.flight_number}</td>
              <td className="badge-icon has-text-centered">
                <a href={article.links.article_link} target="_blank" rel="noopener noreferrer">
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