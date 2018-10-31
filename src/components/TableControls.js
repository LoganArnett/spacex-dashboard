import React from 'react';
import CustomCheckBox from './CustomCheckBox';
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
          <CustomCheckBox title="Land Success" onChange={this.handleChange} checked={landed} name="landed" />
          <CustomCheckBox title="Reused" onChange={this.handleChange} checked={reused}  name="reused" />
          <CustomCheckBox title="With Reddit" onChange={this.handleChange} checked={reddit} name="reddit" />
        </div>
      </section>
    );
  }
}

export default TableControls;