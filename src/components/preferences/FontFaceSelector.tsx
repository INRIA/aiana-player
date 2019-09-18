import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveFontFace } from '../../actions/preferences';
import { IAianaState } from '../../reducers';
import { CDispatch } from '../../store';
import useId from '../../hooks/useId';

interface IStateProps {
  fontFace?: string;
  fontFaces?: string[];
}

interface IDispatchProps {
  changeHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface IProps extends IStateProps, IDispatchProps {}

function FontFaceSelector(props: IProps) {
  const [t] = useTranslation();
  const [id] = useId();

  return (
    <Fragment>
      <span id={id}>{t('preferences.font_face.label')}</span>
      <select
        aria-labelledby={id}
        onBlur={props.changeHandler}
        onChange={props.changeHandler}
        value={props.fontFace}
      >
        {props.fontFaces &&
          props.fontFaces.map((fontFace) => (
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

function mapDispatch(dispatch: CDispatch) {
  return {
    changeHandler: (evt: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(updateActiveFontFace(evt.currentTarget.value));
    }
  };
}

export default connect(
  mapState,
  mapDispatch
)(FontFaceSelector);
