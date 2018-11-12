import * as React from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0;
  margin: -1px;
  border: 0;
  height: 1px;
  width: 1px;
  overflow: hidden;
  white-space: nowrap;
`;

interface IProps {
  children: React.ReactNode;
  id?: string;
}

const AssistiveText: React.SFC<IProps> = ({ children, id }) => (
  <StyledSpan id={id} className="assistive-text">
    {children}
  </StyledSpan>
);

export default AssistiveText;
