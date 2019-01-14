import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class UserStatusSelectValue extends React.PureComponent {
  render() {
    const imgStyles = {
      borderRadius: 3,
      display: 'inline-block',
      marginRight: 10,
      position: 'relative',
      top: -2,
      verticalAlign: 'middle',
    };

    return (
      <div className="Select-value" title={this.props.value.title}>
        <span className="Select-value-label">
          <span className={this.props.value.className} style={imgStyles} />
          {this.props.children}
        </span>
      </div>
    );
  }
}

UserStatusSelectValue.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.object.isRequired,
};

export default connect()(UserStatusSelectValue);
