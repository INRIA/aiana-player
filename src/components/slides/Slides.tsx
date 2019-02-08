import React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers';
import { markdownToJSX } from '../../utils/strings';
import withWindow, { IWindow } from '../hocs/withWindow';
import SlidesStyles from './Styles';

interface IProps {
  text?: string;
}

interface ISlidesProps extends IProps, IWindow {}

function Slides({ text }: ISlidesProps) {
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
