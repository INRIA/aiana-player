import React from 'react';
import { connect } from 'react-redux';
import withWindow from '../../hocs/with-window';
import { IAianaState } from '../../reducers';
import {
  markdownToJSX,
  markdownToJSXForReadability
} from '../../utils/strings';
import StyledSlides from './Styles';

interface IProps {
  text?: string;
  textHighlighting: boolean;
}

function Slides({ text, textHighlighting }: IProps) {
  if (!text) {
    return null;
  }

  return (
    <StyledSlides className="aip-slides">
      <div className="aip-slides-content">
        {textHighlighting
          ? markdownToJSXForReadability(text)
          : markdownToJSX(text)}
      </div>
    </StyledSlides>
  );
}

function mapState(state: IAianaState) {
  return {
    text: state.slides.currentSlideText,
    textHighlighting: state.preferences.textHighlighting
  };
}

export default connect(mapState)(withWindow(Slides));
