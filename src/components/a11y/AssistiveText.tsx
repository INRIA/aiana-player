import React, { ReactNode } from 'react';
import styled, { css } from '../../utils/styled-components';

export const visuallyHiddenMixin = css`
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

export const VisuallyHidden = styled.span`
  ${visuallyHiddenMixin};
`;

interface IProps {
  children: ReactNode;
  id?: string;
}

function AssistiveText({ children, id }: IProps) {
  return (
    <VisuallyHidden id={id} className="assistive-text">
      {children}
    </VisuallyHidden>
  );
}

export default AssistiveText;
