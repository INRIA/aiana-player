import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers';
import { getSelectedTrackLanguage } from '../../reducers/additional-information';
import useId from '../../hooks/useId';
import { getTrackKey } from '../../utils/media';
import { updateActiveAdditionalInformationTrack } from '../../actions/additional-information';
import { IAdditionalInformationState } from '../../reducers/additional-information';

interface IStateProps {
  additionalInformation: IAdditionalInformationState;
}

interface IDispatchProps {
  updateActiveAdditionalInformationTrack(lang: string): void;
}

interface IAdditionalInfoTrackSelector extends IStateProps, IDispatchProps {}

function AdditionalInfoTrackSelector(props: IAdditionalInfoTrackSelector) {
  const [t] = useTranslation();
  const [id] = useId();

  const currentValue = getSelectedTrackLanguage(props.additionalInformation);

  const changeHandler = (evt: React.SyntheticEvent<HTMLSelectElement>) => {
    if (evt.currentTarget.value !== currentValue) {
      props.updateActiveAdditionalInformationTrack(evt.currentTarget.value);
    }
  };

  return (
    <Fragment>
      <span id={id}>{t('preferences.additionalinfotrack.label')}</span>
      <select
        aria-labelledby={id}
        onBlur={changeHandler}
        onChange={changeHandler}
        value={currentValue}
      >
        {props.additionalInformation.tracks.map((track) => (
          <option key={getTrackKey(track)} value={track.language}>
            {t(`languages.${track.language}`)}
          </option>
        ))}
      </select>
    </Fragment>
  );
}

function mapState(state: IAianaState) {
  return {
    additionalInformation: state.additionalInformation
  };
}

const mapDispatch = {
  updateActiveAdditionalInformationTrack
};

export default connect(
  mapState,
  mapDispatch
)(AdditionalInfoTrackSelector);
