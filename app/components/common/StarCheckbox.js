import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class StarCheckbox extends React.PureComponent {
  render() {
    const {
      isChecked,
      isDisabled,
      name,
      onChange,
    } = this.props;

    return (
      <label htmlFor={name} className={classNames('star-checkbox', { disabled: isDisabled })}>
        <span className="star-checkbox-name">{this.props.label}</span>
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={isChecked}
          onChange={onChange}
          disabled={isDisabled}
        />
        <span />
      </label>
    );
  }
}

StarCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

StarCheckbox.defaultProps = {
  isChecked: false,
  isDisabled: false,
};

export default (StarCheckbox);
