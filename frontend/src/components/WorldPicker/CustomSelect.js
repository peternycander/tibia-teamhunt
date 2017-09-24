import React, {Component} from 'react';
import InputField from './styled/InputField';
import SelectIcon from './styled/SelectIcon';
import SelectWrapper from './styled/SelectWrapper';
import WorldList from './styled/WorldList';
import selectIconPath from 'open-iconic/svg/elevator.svg';
import Isvg from 'react-inlinesvg';

export default class CustomSelect extends Component {
  constructor() {
    super();
    this.state = {
      showWorldList: false
    };
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }
  onBlur(e) {
    e.preventDefault();
    this.setState({
      showWorldList: false
    });
  }
  onFocus() {
    this.props.onChange('');
    this.setState({
      showWorldList: true
    });
  }
  render() {
    const {validWorld, value, onChange, children} = this.props;
    return (
      <SelectWrapper onSubmit={this.onBlur}>
        <InputField
          value={value}
          onChange={e => {
            this.onFocus();
            onChange(e.target.value);
          }}
          validWorld={validWorld}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        <Isvg src={selectIconPath} wrapper={props => <SelectIcon {...props} />} />
        {this.state.showWorldList && <WorldList>{children}</WorldList>}
      </SelectWrapper>
    );
  }
}
