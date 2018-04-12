import React, {Component} from 'react';
import InputField from './styled/InputField';
import SelectIcon from './styled/SelectIcon';
import SelectWrapper from './styled/SelectWrapper';
import CustomOption from './styled/CustomOption';
import List from './styled/List';
import selectIconPath from 'open-iconic/svg/elevator.svg';
import Isvg from 'react-inlinesvg';
import PropTypes from 'prop-types';

export default class CustomSelect extends Component {
  constructor() {
    super();
    this.state = {
      highlightedIndex: -1,
      listVisible: false
    };
  }

  static defaultProps = {
    validSelection: true
  };
  static propTypes = {
    validSelection: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    children: PropTypes.array,
    writable: PropTypes.bool
  };
  componentDidMount() {
    this.input.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    this.input.removeEventListener('keydown', this.handleKeyPress);
  }

  componentDidUpdate(prevProps, prevState) {
    const highlightedIndex = this.state.highlightedIndex;
    if (prevState.highlightedIndex !== highlightedIndex) {
      const elementHeight = this.list.children[
        highlightedIndex
      ].getBoundingClientRect().height;
      const worldYPos = highlightedIndex * elementHeight;
      if (
        worldYPos + elementHeight >=
        this.list.scrollTop + this.list.offsetHeight
      ) {
        this.list.scrollTop += elementHeight;
      } else if (worldYPos < this.list.scrollTop) {
        this.list.scrollTop -= elementHeight;
      }
    }
  }

  onDown = () => {
    this.setState({
      highlightedIndex: Math.min(
        this.state.highlightedIndex + 1,
        this.props.children.length - 1
      )
    });
  };

  onUp = () => {
    this.setState({
      highlightedIndex: Math.max(this.state.highlightedIndex - 1, 0)
    });
  };

  selectHighlighted = () => {
    const selectedChild = this.list.children[this.state.highlightedIndex] || {};
    if (selectedChild.innerText) {
      this.props.onChange(selectedChild.innerText);
    }
  };

  handleKeyPress = e => {
    if (e.key === 'ArrowDown') {
      this.onDown();
    } else if (e.key === 'ArrowUp') {
      this.onUp();
    } else if (e.key === 'Enter') {
      this.selectHighlighted();
      this.input.blur();
    }
  };

  handleInputChange = e => {
    const {writable, onChange, value} = this.props;
    this.showList();
    if (writable) {
      onChange(e.target.value);
    } else {
      onChange(value);
    }
    this.setState({
      highlightedIndex: 0
    });
  };

  hideList = e => {
    e.preventDefault();
    const stateDiff = {
      listVisible: false
    };
    if (this.props.validSelection) {
      stateDiff.savedValue = '';
    } else {
      this.props.onChange(this.state.savedValue);
    }
    this.setState(stateDiff);
  };

  showList = () => {
    const {onChange, value} = this.props;
    if (this.state.listVisible) {
      return;
    }
    this.setState({
      listVisible: true,
      savedValue: value
    });
    onChange('');
  };
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
          onChange={this.handleInputChange}
          validSelection={validSelection}
          writable={writable}
          onFocus={this.showList}
          onBlur={this.hideList}
          innerRef={e => (this.input = e)}
        />
        <Isvg
          src={selectIconPath}
          wrapper={props => <SelectIcon {...props} />}
        />
        {listVisible && <List innerRef={e => (this.list = e)}>{items}</List>}
      </SelectWrapper>
    );
  }
}
