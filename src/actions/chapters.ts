import { AnyAction } from 'redux';
import { IRawChaptersTrack } from 'src/utils/media';

export const ADD_CHAPTER_TRACK = 'aiana/ADD_CHAPTER_TRACK';

export function addChaptersTrack(chaptersTrack: IRawChaptersTrack): AnyAction {
  return {
    chaptersTrack,
    type: ADD_CHAPTER_TRACK
  };
}
