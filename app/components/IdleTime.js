import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import IdleTimer from 'react-idle-timer';
import { changeUserStatus } from '../actions/user_actions';

class IdleTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: 600000,
      remaining: null,
      isIdle: false,
      lastActive: null,
      elapsed: null,
    };

    this.onActive = this.onActive.bind(this);
    this.onIdle = this.onIdle.bind(this);
  }

  componentDidMount() {
    this.onMount();

    if (this.idleTimer && this.idleTimer.size > 0) {
      setInterval(() => {
        this.setState({
          remaining: this.idleTimer.getRemainingTime(),
          lastActive: this.idleTimer.getLastActiveTime(),
          elapsed: this.idleTimer.getElapsedTime(),
        });
      }, 1000);
    }
  }

  onMount() {
    if (this.props.user.get('preferences') !== null && this.props.user.get('preferences').get('status_away_timeout') !== null) {
      const statusAwayTimeout = this.props.user.get('preferences').get('status_away_timeout');
      this.setState({ timeout: statusAwayTimeout });
    }

    this.setState({
      remaining: this.idleTimer.getRemainingTime(),
      lastActive: this.idleTimer.getLastActiveTime(),
      elapsed: this.idleTimer.getElapsedTime(),
    });
  }

  onActive() {
    this.setState({ isIdle: false });
    if (this.props.user.get('is_status_changed_automatic') === '1') {
      this.props.changeStatus({
        status: 'Y',
        isAutomatic: '1',
      });
    }
  }

  onIdle() {
    this.setState({ isIdle: true });
    if (this.props.user.get('is_status_changed_automatic') === '1') {
      this.props.changeStatus({
        status: 'A',
        isAutomatic: '1',
      });
    }
  }

  render() {
    return (
      <IdleTimer
        ref={(r) => { this.idleTimer = r; }}
        element={document}
        activeAction={this.onActive}
        idleAction={this.onIdle}
        timeout={this.state.timeout}
        format="DD-MM-YYYY HH:MM:ss"
      >

        <div>
          <IdleTimer />
        </div>

      </IdleTimer>
    );
  }
}

IdleTime.propTypes = {
  user: ImmutablePropTypes.map.isRequired,
  changeStatus: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.getIn(['users', 'authed_user']),
});

const mapDispatchToProps = dispatch => ({
  changeStatus: status => dispatch(changeUserStatus(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IdleTime);
