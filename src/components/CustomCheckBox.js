import React from 'react';

const CustomCheckBox = ({ title, onChange, checked, name }) => (
  <label className="checkbox">
    <input type="checkbox" name={name} onChange={onChange} />
    <span>
      <i className="fa fa-square-o" />
      { checked ? <i className="fa fa-check" /> : null }
    </span>
    { title.toUpperCase() }
  </label>
);

export default CustomCheckBox;