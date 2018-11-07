import { AnyAction } from 'redux';
import { IRawChapterTrack } from 'src/utils/media';

export const ADD_CHAPTER_TRACK = 'aiana/ADD_CHAPTER_TRACK';

export function addChaptersTrack(chaptersTrack: IRawChapterTrack): AnyAction {
  return {
    chaptersTrack,
    type: ADD_CHAPTER_TRACK
  };
}
