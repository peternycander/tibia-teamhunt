import React, {Component} from 'react';
import InputField from './styled/InputField';
import SelectIcon from './styled/SelectIcon';
import SelectWrapper from './styled/SelectWrapper';
import CustomOption from './styled/CustomOption';
import List from './styled/List';
import selectIconPath from 'open-iconic/svg/elevator.svg';
import Isvg from 'react-inlinesvg';

export default class CustomSelect extends Component {
  constructor() {
    super();
    this.hideList = this.hideList.bind(this);
    this.showList = this.showList.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onUp = this.onUp.bind(this);
    this.onDown = this.onDown.bind(this);
    this.selectHighlighted = this.selectHighlighted.bind(this);
    this.state = {
      highlightedIndex: -1,
      listVisible: false
    };
  }
  componentDidMount() {
    this.input.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    this.input.removeEventListener('keydown', this.handleKeyPress);
  }

  componentDidUpdate(prevProps, prevState) {
    const highlightedIndex = this.state.highlightedIndex;
    if (prevState.highlightedIndex !== highlightedIndex) {
      const elementHeight = 28;
      const worldYPos = highlightedIndex * elementHeight;
      if (worldYPos + elementHeight >= this.list.scrollTop + this.list.offsetHeight) {
        this.list.scrollTop += elementHeight;
      } else if (worldYPos < this.list.scrollTop) {
        this.list.scrollTop -= elementHeight;
      }
    }
  }

  onDown() {
    this.setState({
      highlightedIndex: Math.min(this.state.highlightedIndex + 1, this.props.children.size - 1)
    });
  }

  onUp() {
    this.setState({
      highlightedIndex: Math.max(this.state.highlightedIndex - 1, 0)
    });
  }

  selectHighlighted() {
    this.props.onChange(this.list.children[this.state.highlightedIndex].innerText);
  }

  handleKeyPress(e) {
    if (e.key === 'ArrowDown') {
      this.onDown();
    } else if (e.key === 'ArrowUp') {
      this.onUp();
    } else if (e.key === 'Enter') {
      this.selectHighlighted();
      this.input.blur();
    }
  }

  hideList(e) {
    e.preventDefault();
    this.setState({
      listVisible: false
    });
  }

  showList() {
    const {onChange} = this.props;
    onChange('');

    this.setState({
      listVisible: true
    });
  }
  render() {
    const {validSelection, value, onChange, children, writable} = this.props;
    const {highlightedIndex, listVisible} = this.state;
    const items = children.map((item, i) => (
      <CustomOption
        key={item}
        value={item}
        onMouseDown={() => onChange(item)}
        selected={highlightedIndex === i}
      >
        {item}
      </CustomOption>
    ));
    this.items = items;
    return (
      <SelectWrapper onSubmit={this.hideList}>
        <InputField
          value={value}
          onChange={e => {
            this.showList();
            if (writable) {
              onChange(e.target.value);
            } else {
              onChange(value);
            }
          }}
          validSelection={validSelection}
          writable={writable}
          onFocus={this.showList}
          onBlur={this.hideList}
          innerRef={e => (this.input = e)}
        />
        <Isvg src={selectIconPath} wrapper={props => <SelectIcon {...props} />} />
        {listVisible && <List innerRef={e => (this.list = e)}>{items}</List>}
      </SelectWrapper>
    );
  }
}
