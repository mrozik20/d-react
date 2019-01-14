import React from 'react';
import PropTypes from 'prop-types';

class GridHeaderCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
  }

  toggleCheckboxChange() {
    const {
      handleCheckboxChange,
    } = this.props;

    handleCheckboxChange();
  }

  render() {
    const {
      isChecked,
    } = this.props;

    return (
      <div className="checkbox">
        <input
          type="checkbox"
          name="header-checkbox"
          value={name}
          checked={isChecked}
          onChange={this.toggleCheckboxChange}
        />
        <label htmlFor="header-checkbox" />
      </div>
    );
  }
}

GridHeaderCheckbox.propTypes = {
  isChecked: PropTypes.bool,
  handleCheckboxChange: PropTypes.func.isRequired,
};

GridHeaderCheckbox.defaultProps = {
  isChecked: false,
};

export default GridHeaderCheckbox;
