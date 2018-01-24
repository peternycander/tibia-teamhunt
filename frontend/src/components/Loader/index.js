import React from 'react';
import {Loader as ReactLoader} from 'react-loaders';
import 'loaders.css/loaders.min.css';
import styled from 'styled-components';
import colors from 'globals/colors';
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  .loader-inner > div {
    background: ${colors.theme};
  }
`;

export default class Loader extends React.Component {
  state = {
    showLoader: false
  };
  async componentDidMount() {
    await new Promise(r => setTimeout(r, 500));
    if (!this.mountCheck) {
      return;
    }
    this.setState({showLoader: true});
  }
  render() {
    return (
      <Wrapper ref={e => (this.mountCheck = e)}>
        {this.state.showLoader && <ReactLoader type='ball-scale-ripple' />}
      </Wrapper>
    );
  }
}
