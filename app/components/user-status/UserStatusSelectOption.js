import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class UserStatusSelectOption extends React.Component {
  constructor(props) {
    super(props);

    // This seems really dumb..
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }
  handleMouseDown(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSelect(this.props.option, event);
  }
  handleMouseEnter(event) {
    this.props.onFocus(this.props.option, event);
  }
  handleMouseMove(event) {
    if (this.props.isFocused) return;
    this.props.onFocus(this.props.option, event);
  }
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
      <div
        className={this.props.className}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
        role="presentation"
        title={this.props.option.title}
      >
        <span className={this.props.option.className} style={imgStyles} />
        {this.props.children}
      </div>
    );
  }
}

UserStatusSelectOption.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  /*
  isDisabled: PropTypes.bool,
  isSelected: PropTypes.bool.isRequired,
  */
  isFocused: PropTypes.bool.isRequired,
  onFocus: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  option: PropTypes.object.isRequired,
};

UserStatusSelectOption.defaultProps = {
  className: '',
};

export default connect()(UserStatusSelectOption);
