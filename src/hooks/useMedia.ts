import { useContext } from 'react';
import MediaContext from '../contexts/MediaContext';
import { HTMLMedia, YouTubeMedia } from '../utils/media';
import { MEDIA_SELECTOR, YOUTUBE_MEDIA_ID } from '../constants/player';

function isYouTube(src: string) {
  return YOUTUBE_MEDIA_ID.test(src);
}

function useMedia() {
  const [, setState] = useContext(MediaContext);

  function setMedia(src: string) {
    if (isYouTube(src)) {
      const videoId = src.replace('yt--', '');

      setState(() => new YouTubeMedia(videoId));
    } else {
      setState(() => new HTMLMedia(MEDIA_SELECTOR));
    }
  }

  return {
    setMedia
  };
}

export default useMedia;
