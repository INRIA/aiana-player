import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from 'src/reducers';
import { markdownToJSX } from 'src/utils/strings';
import SlidesStyles from './Styles';

interface IProps {
  text: string | null;
}

const Slides: React.SFC<IProps> = ({ text }) => {
  if (!text) {
    return null;
  }

  console.log(text);

  return (
    <SlidesStyles className="aip-slides">{markdownToJSX(text)}</SlidesStyles>
  );
};

const mapStateToProps = (state: IAianaState) => ({
  text: state.slides.currentSlideText
});

export default connect(mapStateToProps)(Slides);
