import React from 'react';
import CopyIcon from './CopyIcon';
import clipboard from 'clipboard-js';
import {Player as Wrapper, FullWidth} from './styled';

const promotionNames = {
  //Note the non breaking spaces
  'Elite Knight': true,
  'Master Sorcerer': true,
  'Elder Druid': true,
  'Royal Paladin': true
};
const promoted = vocation => Boolean(promotionNames[vocation]);
export default class Player extends React.Component {
  state = {
    showCopied: false
  };
  copyText = async text => {
    await clipboard.copy(text);
    this.setState({showCopied: true});
    setTimeout(() => {
      this.setState({showCopied: false});
    }, 2000);
  };
  shouldComponentUpdate({player, shareRange}, {showCopied}) {
    if (showCopied !== this.state.showCopied) {
      return true;
    }
    if (player !== this.props.player) {
      return true;
    }
    const prevPlayer = this.props.player;
    const prevShareRange = this.props.shareRange;
    if (
      (player.get('level') >= shareRange.get('min') && player.get('level') <= shareRange.get('max')) ===
      (prevPlayer.get('level') >= prevShareRange.get('min') && prevPlayer.get('level') <= prevShareRange.get('max'))
    ) {
      return false;
    }
    return true;
  }
  render() {
    const {player, shareRange} = this.props;
    const {showCopied} = this.state;
    const regularContent = (
      <React.Fragment>
        <button onClick={() => this.copyText(player.get('name'))} title='Copy name to clipboard'>
          <CopyIcon />
        </button>
        <a
          href={`https://secure.tibia.com/community/?subtopic=characters&name=${encodeURIComponent(
            player.get('name')
          )}`}
          target='_blank'
        >
          {player.get('name')}
        </a>
        <span>{player.get('level')}</span>
      </React.Fragment>
    );
    return (
      <Wrapper
        sharable={player.get('level') >= shareRange.get('min') && player.get('level') <= shareRange.get('max')}
        promoted={promoted(player.get('vocation'))}
      >
        {showCopied ? <FullWidth>Copied name to clipboard</FullWidth> : regularContent}
      </Wrapper>
    );
  }
}
