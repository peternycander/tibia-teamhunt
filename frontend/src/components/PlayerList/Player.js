import React from 'react';
import CopyIcon from './CopyIcon';
import clipboard from 'clipboard-js';
import {Player as Wrapper, FullWidth, CopyButton, PlayerName} from './styled';

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
      if (!this.mountCheck) {
        return;
      }
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
    const isPromoted = promoted(player.get('vocation'));
    const regularContent = (
      <React.Fragment>
        <CopyButton onClick={() => this.copyText(player.get('name'))} title='Copy name to clipboard'>
          <CopyIcon />
        </CopyButton>
        <PlayerName
          href={`https://secure.tibia.com/community/?subtopic=characters&name=${encodeURIComponent(
            player.get('name')
          )}`}
          target='_blank'
          promoted={isPromoted}
        >
          {player.get('name')}
        </PlayerName>
        <span>{player.get('level')}</span>
      </React.Fragment>
    );
    return (
      <Wrapper
        ref={e => (this.mountCheck = e)}
        sharable={player.get('level') >= shareRange.get('min') && player.get('level') <= shareRange.get('max')}
        promoted={isPromoted}
      >
        {showCopied ? <FullWidth>Copied name to clipboard</FullWidth> : regularContent}
      </Wrapper>
    );
  }
}
