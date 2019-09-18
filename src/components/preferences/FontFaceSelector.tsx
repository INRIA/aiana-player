import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveFontFace } from '../../actions/preferences';
import withUniqueId, { IInjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';
import { CDispatch } from '../../store';

interface IStateProps {
  fontFace?: string;
  fontFaces?: string[];
}

interface IDispatchProps {
  changeHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface IProps extends IStateProps, IDispatchProps, IInjectedUniqueIdProps {}

function FontFaceSelector(props: IProps) {
  const [t] = useTranslation();

  return (
    <Fragment>
      <span id={props.uid}>{t('preferences.font_face.label')}</span>
      <select
        aria-labelledby={props.uid}
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
)(withUniqueId(FontFaceSelector));
