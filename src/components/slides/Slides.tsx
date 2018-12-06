import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers';
import { markdownToJSX } from '../../utils/strings';
import SlidesStyles from './Styles';

interface IProps {
  text?: string;
}

const Slides: React.SFC<IProps> = ({ text }) => {
  if (!text) {
    return null;
  }

  return (
    <SlidesStyles className="aip-slides">
      <div className="aip-slides-content">{markdownToJSX(text)}</div>
    </SlidesStyles>
  );
};

const mapStateToProps = (state: IAianaState) => ({
  text: state.slides.currentSlideText
});

export default connect(mapStateToProps)(Slides);
