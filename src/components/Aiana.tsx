import * as React from 'react';
import IntlWrapper from './IntlWrapper';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: block;
  box-sizing: border-box;
  background-color: #000;
  color: #fff;
  font-size: 1rem;
  line-height: 1;
  font-family: system, sans-serif;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

class Aiana extends React.Component {
  public render() {
    return (
      <StyledDiv>
        <IntlWrapper />
      </StyledDiv>
    );
  }
}

export default Aiana;
