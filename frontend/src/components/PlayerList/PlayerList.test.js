import React from 'react';
import {render, Simulate} from 'react-testing-library';

import PlayerList from './PlayerList';

const player = name => ({level: 100, name});

it('Returns null when onlineList is empty', () => {
  const props = {
    onlineList: {
      knights: [],
      druids: [],
      paladins: [],
      sorcerers: []
    }
  };
  const {container} = render(<PlayerList {...props} />);
  expect(container.firstChild).toBeNull();
});

it('Returns loader when loading', () => {
  const props = {
    loading: true,
    onlineList: {
      knights: Array(10).fill(player('knight')),
      druids: [],
      paladins: [],
      sorcerers: []
    }
  };
  const {getByTestId} = render(<PlayerList {...props} />);
  getByTestId('loader'); // will throw if not exists
});

it('Returns list of knights', () => {
  const knights = Array(10)
    .fill({})
    .map((a, i) => player(`knight${i}`));
  const props = {
    onlineList: {
      knights,
      druids: [],
      paladins: [],
      sorcerers: []
    }
  };
  const {getByText} = render(<PlayerList {...props} />);
  for (let i = 0; i < knights.length; i++) {
    getByText(`knight${i}`);
  }
});

it('Hides knights when clicking header', () => {
  const knights = Array(10)
    .fill({})
    .map((a, i) => player(`knight${i}`));
  const props = {
    onlineList: {
      knights,
      druids: [],
      paladins: [],
      sorcerers: []
    }
  };
  const {getByText, queryByText} = render(<PlayerList {...props} />);
  Simulate.click(getByText('Knights'));
  for (let i = 0; i < knights.length; i++) {
    expect(queryByText(`knight${i}`)).toBeNull();
  }
});
