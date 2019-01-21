import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers';
import { markdownToJSX } from '../../utils/strings';
import withDraggable, { IDraggable } from '../hocs/withDraggable';
import SlidesStyles from './Styles';

interface IProps {
  text?: string;
}

interface ISlidesProps extends IProps, IDraggable {}

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

export default connect(mapStateToProps)(withDraggable(Slides));
