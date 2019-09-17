import React, { createContext, PropsWithChildren, useState } from 'react';

const MediaContext = createContext([{} as any, (): void => {}]);

export function MediaContextProvider(props: PropsWithChildren<any>) {
  const [state, setState] = useState({
    pause() {},
    play() {},
    buffered: [] as any,
    currentTime: 0,
    duration: 0,
    muted: false,
    paused: true,
    playbackRate: 1,
    volume: 0
  });

  return (
    <MediaContext.Provider value={[state, setState]}>
      {props.children}
    </MediaContext.Provider>
  );
}

export default MediaContext;
