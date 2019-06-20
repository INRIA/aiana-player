import React from 'react';
import classNames from 'classnames';
import styled from '../../utils/styled-components';
import SvgStar from '../svg/Star';

interface IProps {
  associatedRating: number;
  rating: number;
  clickHandler(rating: number): void;
  mouseEnterHandler(rating: number): void;
}

const StyledStar = styled(SvgStar)`
  path {
    fill: none;
    stroke: ${(props) => props.theme.fg};
    stroke-linejoin: round;

    touch-action: none;
  }

  &.filled path {
    fill: ${(props) => props.theme.fg};
  }
`;

function RatingStar(props: IProps) {
  const cls = classNames({
    filled: props.associatedRating <= props.rating
  });

  return (
    <StyledStar
      className={cls}
      onMouseEnter={() => props.mouseEnterHandler(props.associatedRating)}
      onClick={() => props.clickHandler(props.associatedRating)}
    />
  );
}

export default RatingStar;
