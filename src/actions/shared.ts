import axios from 'axios';
import * as queryString from 'query-string';
import { AnyAction } from 'redux';
import { CDispatch } from 'src/store';
import { ThunkResult } from 'src/types';

export const LOAD_CONFIGURATION = 'aiana/LOAD_CONFIGURATION';

export function handleFetchInitialData(): ThunkResult<void> {
  return (dispatch: CDispatch) => {
    const parsed = queryString.parse(location.search);

    if (parsed.config) {
      axios.get(parsed.config as string).then(({ data }) => {
        dispatch(loadConfiguration(data));
      });
    } else if (parsed.src) {
      dispatch(
        loadConfiguration({
          player: {
            sources: [{ src: parsed.src }]
          }
        })
      );
    } else {
      axios.get('/configuration.json').then(({ data }) => {
        dispatch(loadConfiguration(data));
      });
    }
  };
}

function loadConfiguration(configuration: any): AnyAction {
  return {
    bookmarks: configuration.bookmarks,
    chapters: configuration.chapters,
    player: configuration.player,
    preferences: configuration.preferences,
    slides: configuration.slides,
    subtitles: configuration.subtitles,
    type: LOAD_CONFIGURATION
  };
}
