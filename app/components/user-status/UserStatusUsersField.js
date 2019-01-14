import React from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import 'react-select/dist/react-select.css';
import UserStatusSelectOption from '../user-status/UserStatusSelectOption';
import UserStatusSelectValue from '../user-status/UserStatusSelectValue';
import { changeUserStatus } from '../../actions/user_actions';
import { STATUSES } from '../common/UserSettings';

class UserStatusUsersField extends React.Component {
  constructor(props) {
    super(props);
    this.setValue = this.setValue.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const userStatus = newProps.user.get('is_online');
    if (this.state !== null && userStatus !== this.state.value) {
      const newUserStatus = this.filterStatus(userStatus);
      this.setState({ newUserStatus });
    }
  }

  setValue(value) {
    this.setState({ value });
    if (value !== null) {
      let isAutomatic = '0';
      switch (value.value) {
        case 'Y':
          isAutomatic = '1';
          break;
        default:
          break;
      }
      this.props.changeStatus({
        status: value.value,
        isAutomatic,
      });
    }
  }

  translateStatuses(statuses) {
    const transStatuses = statuses.map((option) => {
      const obj = Object.assign({}, option, {
        label: this.props.intl.formatMessage(option.label),
      });
      return obj;
    });
    return transStatuses;
  }

  filterStatus(isOnline) {
    const status = STATUSES.filter(element => (
      element.value === isOnline
    ));

    if (status.length > 0) {
      return Object.assign({}, status[0], {
        label: this.props.intl.formatMessage(status[0].label),
      });
    }
    return null;
  }

  render() {
    const placeholder = (
      <span>
        {this.props.placeholder ||
        this.props.intl.formatMessage({ id: 'app.user.statusSelect.options.blank' })}
      </span>
    );
    return (
      <div className="section">
        <Select
          onChange={this.setValue}
          optionComponent={UserStatusSelectOption}
          options={this.translateStatuses(STATUSES)}
          placeholder={placeholder}
          value={this.filterStatus(this.props.user.get('is_online'))}
          valueComponent={UserStatusSelectValue}
        />
      </div>
    );
  }
}

UserStatusUsersField.propTypes = {
  user: ImmutablePropTypes.map.isRequired,
  placeholder: PropTypes.string,
  changeStatus: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

UserStatusUsersField.defaultProps = {
  placeholder: null,
};

const mapStateToProps = state => ({
  user: state.getIn(['users', 'authed_user']),
});

const mapDispatchToProps = dispatch => ({
  changeStatus: status => dispatch(changeUserStatus(status)),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(UserStatusUsersField));
