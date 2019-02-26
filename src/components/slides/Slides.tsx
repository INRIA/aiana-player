import React from 'react';
import { connect } from 'react-redux';
import withWindow from '../../hocs/with-window';
import { IAianaState } from '../../reducers';
import { markdownToJSX } from '../../utils/strings';
import SlidesStyles from './Styles';

interface IProps {
  text?: string;
}

function Slides({ text }: IProps) {
  if (!text) {
    return null;
  }

  return (
    <SlidesStyles className="aip-slides">
      <div className="aip-slides-content">{markdownToJSX(text)}</div>
    </SlidesStyles>
  );
}

function mapStateToProps(state: IAianaState) {
  return {
    text: state.slides.currentSlideText
  };
}

export default connect(mapStateToProps)(withWindow(Slides));
