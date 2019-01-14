import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FilterSelectValue extends React.PureComponent {
  render() {
    const elementStyles = {
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
          <span style={elementStyles}>Viewing:</span>
          {this.props.children}
        </span>
      </div>
    );
  }
}

FilterSelectValue.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.object.isRequired,
};

export default connect()(FilterSelectValue);
