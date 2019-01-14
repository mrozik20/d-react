import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SendFromSelectValue extends React.PureComponent {
  render() {
    return (
      <div className="Select-value" title={this.props.value.title}>
        <span className="Select-value-label">
          {this.props.children}
        </span>
      </div>
    );
  }
}

SendFromSelectValue.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.object.isRequired,
};

export default connect()(SendFromSelectValue);
