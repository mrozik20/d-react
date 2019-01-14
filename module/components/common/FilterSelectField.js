import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import 'react-select/dist/react-select.css';
import FilterSelectValue from './FilterSelectValue';
import { prepareOptions } from '../common/ModuleSettings';

import '../../../app/style/filterselect.less';

class FilterSelectField extends React.Component {
  constructor(props) {
    super(props);
    this.setValue = this.setValue.bind(this);
    this.state = { value: 'all' };
  }

  setValue(value) {
    switch (value.value) {
      case 'other':
        break;
      case 'drafts':
      case 'trash':
      case 'quick_sequence':
        if (this.props.onNavClick) {
          this.props.onNavClick(value.value);
        }
        break;
      default:
        this.setState({ value });
        this.props.onFilterSelect(value.value);
    }
  }

  translateOptions(statuses) {
    const transStatuses = statuses.map((option) => {
      const obj = Object.assign({}, option, {
        label: this.props.intl.formatMessage(option.label),
      });
      return obj;
    });
    return transStatuses;
  }

  filterStatus(statusToFilter) {
    const status = prepareOptions(this.props.mode).filter(element => (
      element.value === statusToFilter
    ));

    if (status.length > 0) {
      return Object.assign({}, status[0], {
        label: this.props.intl.formatMessage(status[0].label),
      });
    }
    return null;
  }

  render() {
    const placeholder = <span>{this.props.placeholder}</span>;
    return (
      <div className="section filter-select">
        <Select
          name="form-field-name"
          onChange={this.setValue}
          options={this.translateOptions(prepareOptions(this.props.mode))}
          placeholder={placeholder}
          value={this.state.value}
          valueComponent={FilterSelectValue}
        />
      </div>
    );
  }
}

FilterSelectField.propTypes = {
  placeholder: PropTypes.object,
  intl: intlShape.isRequired,
  onFilterSelect: PropTypes.func.isRequired,
  onNavClick: PropTypes.func,
  mode: PropTypes.string.isRequired,
};

FilterSelectField.defaultProps = {
  onNavClick: null,
  placeholder: <FormattedMessage id="fuplanner.sequences.select.options.placeholder" />,
};

export default injectIntl(FilterSelectField);
