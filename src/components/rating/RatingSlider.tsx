import React, { Component, KeyboardEvent } from 'react';
import RatingStar from './RatingStar';
import { range } from '../../utils/range';
import styled from '../../utils/styled-components';
import {
  ARROW_RIGHT_KEY,
  ARROW_UP_KEY,
  ARROW_LEFT_KEY,
  ARROW_DOWN_KEY,
  PAGE_UP_KEY,
  PAGE_DOWN_KEY,
  HOME_KEY,
  END_KEY
} from '../../constants/keys';
import { connect } from 'react-redux';
import { updateRating } from '../../actions/player';
import { bounded } from '../../utils/ui';
import { WithTranslation, withTranslation } from 'react-i18next';

interface IProps {
  currentRating: number;
  maxRating: number;
  minRating: number;
}

interface IMapDispatch {
  updateRating(rating: number): void;
}

interface IState {
  expectedRating: number;
  isHovering: boolean;
}

interface IRatingSlider extends IProps, IMapDispatch, WithTranslation {}

const Slider = styled.div`
  display: flex;

  &:not([aria-disabled='true']):not([disabled]):not([aria-hidden='true']) {
    cursor: pointer;
  }

  &:focus:not([data-focus-visible-added]),
  &[data-focus-visible-added] {
    outline: solid 2px ${(props) => props.theme.actionBg};
  }

  svg {
    height: 100%;
    width: 1.75em;
  }
`;

class RatingSlider extends Component<IRatingSlider, IState> {
  readonly state = {
    expectedRating: 0,
    isHovering: false
  };

  render() {
    const calcRating = this.state.isHovering
      ? this.state.expectedRating
      : this.props.currentRating;

    return (
      <Slider
        aria-label={this.props.t('media.rating.slider.label')}
        aria-valuemax={this.props.maxRating}
        aria-valuemin={this.props.minRating}
        aria-valuenow={this.props.currentRating}
        aria-valuetext={this.props.t('media.rating.slider.current_value', {
          currentRating: this.props.currentRating,
          maxRating: this.props.maxRating
        })}
        onKeyDown={this.keyDownHandler}
        onMouseEnter={this.mouseEnterHandler}
        onMouseLeave={this.mouseLeaveHandler}
        role="slider"
        tabIndex={0}
      >
        {range(this.props.maxRating, this.props.minRating).map((rating) => (
          <RatingStar
            key={rating}
            rating={calcRating}
            associatedRating={rating}
            mouseEnterHandler={this.starMouseEnterHandler}
            clickHandler={this.starClickHandler}
          />
        ))}
      </Slider>
    );
  }

  keyDownHandler = (evt: KeyboardEvent<HTMLDivElement>) => {
    this.setState({
      isHovering: false
    });

    switch (evt.key) {
      case ARROW_RIGHT_KEY:
      case ARROW_UP_KEY:
      case PAGE_UP_KEY:
        this.props.updateRating(this.safeRating(this.props.currentRating + 1));
        break;
      case ARROW_LEFT_KEY:
      case ARROW_DOWN_KEY:
      case PAGE_DOWN_KEY:
        this.props.updateRating(this.safeRating(this.props.currentRating - 1));
        break;
      case HOME_KEY:
        this.props.updateRating(this.safeRating(this.props.minRating));
        break;
      case END_KEY:
        this.props.updateRating(this.safeRating(this.props.maxRating));
        break;
    }
  };

  starClickHandler = (rating: number) => {
    this.props.updateRating(this.safeRating(rating));
  };

  safeRating = (rating: number) => {
    return bounded(rating, this.props.minRating, this.props.maxRating);
  };

  mouseEnterHandler = () => {
    this.setState({
      isHovering: true
    });
  };

  mouseLeaveHandler = () => {
    this.setState({
      expectedRating: 0,
      isHovering: false
    });
  };

  starMouseEnterHandler = (rating: number) => {
    this.setState({
      expectedRating: rating
    });
  };
}

const mapDispatch = {
  updateRating
};

export default connect(
  null,
  mapDispatch
)(withTranslation()(RatingSlider));
