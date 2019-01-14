import React from 'react';
import PropTypes from 'prop-types';

import '../../style/toggle.less';

class ToggleCheckbox extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.checked !== this.props.checked) {
      return true;
    }
    if (nextProps.disabled !== this.props.disabled) {
      return true;
    }
    return false;
  }
  render() {
    const {
      checked,
      disabled,
      id,
      value,
      onChange,
    } = this.props;
    const name = `status-checkbox-${id}`;

    return (
      <div className="toggle-checkbox">
        <label className="switch" htmlFor={name}>
          <input
            className="switch-input"
            type="checkbox"
            name={name}
            id={name}
            value={value}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
          />
          <span className={`switch-label ${disabled ? 'green' : ''}`} />
          <span className="switch-handle" />
        </label>
      </div>
    );
  }
}

ToggleCheckbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
};
ToggleCheckbox.defaultProps = {
  checked: false,
  disabled: false,
  value: '',
};

export default ToggleCheckbox;
