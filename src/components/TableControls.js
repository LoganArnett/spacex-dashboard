import React from 'react';
import '../scss/TableControls.scss';

class TableControls extends React.Component {
  handleChange = ({ target: { name } }) => {
    return this.props.filterBy(name);
  };
  render() {
    const { refresh, filters: { landed, reused, reddit } } = this.props;
    return (
      <section className="controls columns">
        <div className="refresh column">
          <button className="button is-medium" onClick={refresh}>
            <span className="icon">
              <i className="fa fa-refresh" />
            </span>
          </button>
        </div>
        <div className="column is-one-half checkboxes">
          <label className="checkbox">
            <input type="checkbox" name="landed" onChange={this.handleChange} />
            <span>
              <i className="fa fa-square-o" />
              { landed ? <i className="fa fa-check" /> : null }
            </span>
            LAND SUCCESS
          </label>
          <label className="checkbox">
            <input type="checkbox" name="reused" onChange={this.handleChange} />
            <i className="fa fa-square-o" />
            { reused ? <i className="fa fa-check" /> : null }
            REUSED
          </label>
          <label className="checkbox">
            <input type="checkbox" name="reddit" onChange={this.handleChange} />
            <i className="fa fa-square-o" />
            { reddit ? <i className="fa fa-check" /> : null }
            WITH REDDIT
          </label>
        </div>
      </section>
    );
  }
}

export default TableControls;