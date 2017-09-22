import React from 'react';
import styled from 'styled-components';
import colors from 'globals/colors';

const InputField = styled.input.attrs({
  type: 'text'
})`
  padding: 5px;
  border-radius: 3px;
  border: 1px solid black;
  border-color: ${props => (props.validWorld ? 'green' : colors.black)};
  outline: none;
`;

export default function({validWorld, value, onChange, children}) {
  return (
    <div>
      <InputField value={value} onChange={onChange} validWorld={validWorld} />
      <div>{children}</div>
    </div>
  );
}
