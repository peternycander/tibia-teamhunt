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
    this.hideWorldList = this.hideWorldList.bind(this);
    this.showWorldList = this.showWorldList.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    this.input.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    this.input.removeEventListener('keydown', this.handleKeyPress);
  }

  componentDidUpdate(prevProps) {
    const highlightedIndex = this.props.highlightedIndex;
    if (prevProps.highlightedIndex !== highlightedIndex) {
      const elementHeight = 28;
      const worldYPos = highlightedIndex * elementHeight;
      if (worldYPos + elementHeight >= this.worldList.scrollTop + this.worldList.offsetHeight) {
        this.worldList.scrollTop += elementHeight;
      } else if (worldYPos < this.worldList.scrollTop) {
        this.worldList.scrollTop -= elementHeight;
      }
    }
  }

  handleKeyPress(e) {
    if (e.key === 'ArrowDown') {
      this.props.onDown();
    } else if (e.key === 'ArrowUp') {
      this.props.onUp();
    } else if (e.key === 'Enter') {
      this.props.selectHighlighted();
      this.input.blur();
    }
  }

  hideWorldList(e) {
    e.preventDefault();
    this.props.hideWorldList();
  }
  showWorldList() {
    this.props.onChange('');
    this.props.showWorldList();
  }
  render() {
    const {validWorld, value, onChange, children, worldListVisible} = this.props;
    return (
      <SelectWrapper onSubmit={this.hideWorldList}>
        <InputField
          value={value}
          onChange={e => {
            this.showWorldList();
            onChange(e.target.value);
          }}
          validWorld={validWorld}
          onFocus={this.showWorldList}
          onBlur={this.hideWorldList}
          innerRef={e => (this.input = e)}
        />
        <Isvg src={selectIconPath} wrapper={props => <SelectIcon {...props} />} />
        {worldListVisible && <WorldList innerRef={e => (this.worldList = e)}>{children}</WorldList>}
      </SelectWrapper>
    );
  }
}
