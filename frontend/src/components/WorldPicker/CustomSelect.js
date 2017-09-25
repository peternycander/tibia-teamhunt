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
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onDown = this.onDown.bind(this);
  }
  componentDidMount() {
    this.input.addEventListener('keydown', this.onDown);
  }
  componentWillUnmount() {
    this.input.removeEventListener('keydown', this.onDown);
  }

  componentDidUpdate(prevProps) {
    const highlightedIndex = this.props.highlightedIndex;
    if (prevProps.highlightedIndex !== highlightedIndex) {
      const worldYPos = highlightedIndex * 28;
      if (worldYPos + 28 >= this.worldList.scrollTop + this.worldList.offsetHeight) {
        this.worldList.scrollTop += 28;
      } else if (worldYPos < this.worldList.scrollTop) {
        this.worldList.scrollTop -= 28;
      }
    }
  }

  onDown(e) {
    if (e.key === 'ArrowDown') {
      this.props.onDown();
    } else if (e.key === 'ArrowUp') {
      this.props.onUp();
    } else if (e.key === 'Enter') {
      this.props.selectHighlighted();
      this.input.blur();
    }
  }

  onBlur(e) {
    e.preventDefault();
    this.props.hideWorldList();
  }
  onFocus() {
    this.props.onChange('');
    this.props.showWorldList();
  }
  render() {
    const {validWorld, value, onChange, children, worldListVisible} = this.props;
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
          innerRef={e => (this.input = e)}
        />
        <Isvg src={selectIconPath} wrapper={props => <SelectIcon {...props} />} />
        {worldListVisible && <WorldList innerRef={e => (this.worldList = e)}>{children}</WorldList>}
      </SelectWrapper>
    );
  }
}
