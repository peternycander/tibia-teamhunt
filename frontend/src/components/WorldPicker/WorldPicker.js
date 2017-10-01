import React, {Component} from 'react';
import CustomSelect from 'components/CustomSelect';
import Error from 'components/Error';
import TryAgainButton from 'components/TryAgainButton';
import Loader from 'components/Loader';

export default class WorldPicker extends Component {
  componentDidMount() {
    this.props.loadWorlds();
  }
  render() {
    const {
      selectedWorld = 'Antica',
      changeWorld,
      validWorld,
      worlds,
      error,
      loadWorlds,
      loading
    } = this.props;
    if (error) {
      return (
        <div>
          <Error>{error}</Error>
          <TryAgainButton onClick={loadWorlds}>Try again</TryAgainButton>
        </div>
      );
    } else if (loading) {
      return <Loader />;
    }
    return (
      <CustomSelect
        value={selectedWorld}
        validSelection={validWorld}
        onChange={changeWorld}
        writable
      >
        {worlds}
      </CustomSelect>
    );
  }
}
