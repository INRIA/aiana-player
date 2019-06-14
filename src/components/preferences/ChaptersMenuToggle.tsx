import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setChaptersMenu } from '../../actions/chapters';
import withUniqueId, { IInjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';
import ToggleButton from '../shared/toggle-button';

interface IStateProps {
  menuEnabled: boolean;
}

interface IDispatchProps {
  setChaptersMenu(enabled: boolean): any;
}

interface IChaptersMenuToggle
  extends IStateProps,
    IDispatchProps,
    IInjectedUniqueIdProps {}

function ChaptersMenuToggle(props: IChaptersMenuToggle) {
  const [t] = useTranslation();

  return (
    <React.Fragment>
      <span id={props.uid}>{t('preferences.show_chapters.label')}</span>
      <ToggleButton
        isOn={props.menuEnabled}
        labelledBy={props.uid}
        onClick={() => props.setChaptersMenu(!props.menuEnabled)}
      />
    </React.Fragment>
  );
}

function mapState(state: IAianaState) {
  return {
    menuEnabled: state.chapters.menuEnabled
  };
}

const mapDispatch = {
  setChaptersMenu
};

export default connect(
  mapState,
  mapDispatch
)(withUniqueId(ChaptersMenuToggle));
