import { useContext, useEffect, useRef, useState, useReducer, createContext, useMemo } from 'react';
// @ts-ignore
window.soundManager.setup({ debugMode: false });

export const SoundContext = createContext({
  isPlaying: false,
  setIsPlaying: (newState: boolean) => {}
});

export default function SoundProvider(props: any) {
  const { children } = props;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const value = { isPlaying, setIsPlaying };
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound() {
  return useContext(SoundContext);
}
