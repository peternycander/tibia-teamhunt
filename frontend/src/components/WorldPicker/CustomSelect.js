import React, {Component} from 'react';
import styled from 'styled-components';
import colors from 'globals/colors';
import selectIcon from 'open-iconic/svg/elevator.svg';
var Isvg = require('react-inlinesvg');

const InputField = styled.input.attrs({
  type: 'text'
})`
  padding: 5px;
  border-radius: 4px;
  border: 0;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 300;
  text-align: center;
  transition: all 0.3s ease-in-out;
  background: ${props => (props.validWorld ? colors.okGreen : colors.errorRed)};
  color: white;
  outline: none;
  cursor: pointer;
`;
const SelectIcon = styled.span`
  position: absolute;
  top: 5px;
  width: 11px;
  right: 10px;
  fill: white;
  svg {
    width: 100%;
    height: auto;
  }
`;

const SelectWrapper = styled.form`
  position: relative;
  margin-top: 15px;
  width: 300px;
  min-height: 50px;
`;

const WorldList = styled.div`
  max-height: 200px;
  overflow-y: scroll;
`;

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
        <Isvg src={selectIcon} wrapper={props => <SelectIcon {...props} />} />
        {this.state.showWorldList && <WorldList>{children}</WorldList>}
      </SelectWrapper>
    );
  }
}
