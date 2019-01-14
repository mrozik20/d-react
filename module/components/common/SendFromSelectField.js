import React from 'react';
import Select from 'react-select';
import defaultMenuRenderer from 'react-select/lib/utils/defaultMenuRenderer';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-select/dist/react-select.css';

import SendFromSelectValue from './SendFromSelectValue';
import '../../../app/style/filterselect.less';

import {
  setDraftSequenceSendFrom,
} from '../../actions';

import {
  loadFromAddresses,
} from '../../../messagecenter/actions';

class SendFromSelectField extends React.Component {
  constructor(props) {
    super(props);
    this.setValue = this.setValue.bind(this);
  }

  componentWillMount() {
    this.props.loadFromAddresses();
  }

  setValue({ value }) {
    this.props.setFrom(this.props.mode, value);
  }

  setFirstValue(firstOption) {
    this.setState({ value: firstOption });
  }

  get defaultValue() {
    if (this.options && this.options.length) {
      return this.options[0].value;
    }
    return undefined;
  }

  get options() {
    const {
      mode,
      fromAddresses,
    } = this.props;

    return fromAddresses
      .filter(opt => opt.get('type') === mode && opt.get('enabled'))
      .map(opt => opt.get('number') || opt.get('address'))
      .map(opt => ({
        label: opt,
        value: opt,
      }))
      .toArray();
  }

  get selected() {
    return this.props.sequence.getIn(['send_from', this.props.mode]) || this.defaultValue;
  }

  render() {
    const {
      mode,
      placeholder,
    } = this.props;

    if (!this.options.length) {
      return (
        <NavLink to="#add-address" className="send-from-select-empty">
          <FormattedMessage id={`create.review_step.select.add_${mode}_option_title`} />
        </NavLink>
      );
    }

    const menuRenderer = params => (
      [
        defaultMenuRenderer(params),
        <div className="add-address-link" role="option" aria-selected="false">
          <NavLink to="#add-address" className="">
            <FormattedMessage id={`create.review_step.select.add_${mode}_option_title`} />
          </NavLink>
        </div>,
      ]
    );

    return (
      <div className="section filter-select add-select">
        <span className="select-label">
          <FormattedMessage id={`create.review_step.select.${mode}_title`} />
        </span>
        <Select
          name={`${this.props.mode}_add_select_from`}
          onChange={this.setValue}
          options={this.options}
          placeholder={<span>{placeholder}</span>}
          value={this.selected}
          valueComponent={SendFromSelectValue}
          menuRenderer={menuRenderer}
        />
      </div>
    );
  }
}

SendFromSelectField.propTypes = {
  placeholder: PropTypes.object,
  mode: PropTypes.string.isRequired,
  fromAddresses: ImmutablePropTypes.list.isRequired,
  sequence: ImmutablePropTypes.map.isRequired,

  loadFromAddresses: PropTypes.func.isRequired,
  setFrom: PropTypes.func.isRequired,
};

SendFromSelectField.defaultProps = {
  placeholder: <FormattedMessage id="fuplanner.sequences.select.options.placeholder" />,
};

const mapState = state => ({
  fromAddresses: state.getIn(['messagecenter', 'addresses']),
  sequence: state.getIn(['fuplanner', 'draft_sequence']),
});
const mapDispatch = dispatch => ({
  loadFromAddresses: () => dispatch(loadFromAddresses()),
  setFrom: (type, value) => dispatch(setDraftSequenceSendFrom(type, value)),
});

export default connect(mapState, mapDispatch)(SendFromSelectField);
