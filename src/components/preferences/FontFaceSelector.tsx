import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveFontFace } from '../../actions/preferences';
import { IAianaState } from '../../reducers';
import useId from '../../hooks/useId';

interface IStateProps {
  fontFace: string;
  fontFaces: string[];
}

interface IDispatchProps {
  updateActiveFontFace(name: string): void;
}

interface IProps extends IStateProps, IDispatchProps {}

function FontFaceSelector(props: IProps) {
  const [t] = useTranslation();
  const [id] = useId();

  const changeHandler = (evt: React.SyntheticEvent<HTMLSelectElement>) => {
    const fontFace = evt.currentTarget.value;

    if (fontFace !== props.fontFace) {
      props.updateActiveFontFace(evt.currentTarget.value);
    }
  };

  return (
    <Fragment>
      <span id={id}>{t('preferences.font_face.label')}</span>
      <select
        aria-labelledby={id}
        onBlur={changeHandler}
        onChange={changeHandler}
        value={props.fontFace}
      >
        {props.fontFaces.map((fontFace) => (
          <option key={fontFace} value={fontFace}>
            {fontFace}
          </option>
        ))}
      </select>
    </Fragment>
  );
}

function mapState(state: IAianaState) {
  return {
    fontFace: state.preferences.fontFace,
    fontFaces: state.preferences.fontFaces
  };
}

const mapDispatch = {
  updateActiveFontFace
};

export default connect(
  mapState,
  mapDispatch
)(FontFaceSelector);
