import React from 'react';
import PropTypes from 'prop-types';

class GridCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
  }

  toggleCheckboxChange() {
    const {
      handleCheckboxChange,
      name,
    } = this.props;

    handleCheckboxChange(name);
  }

  render() {
    const {
      isChecked,
      name,
    } = this.props;

    return (
      <div className="checkbox">
        <input
          type="checkbox"
          name={`checkbox-${name}`}
          value={name}
          checked={isChecked}
          onChange={this.toggleCheckboxChange}
        />
        <label htmlFor={`checkbox-${name}`} />
      </div>
    );
  }
}

GridCheckbox.propTypes = {
  isChecked: PropTypes.bool,
  name: PropTypes.string,
  handleCheckboxChange: PropTypes.func.isRequired,
};

GridCheckbox.defaultProps = {
  isChecked: false,
  name: '',
};

export default GridCheckbox;
