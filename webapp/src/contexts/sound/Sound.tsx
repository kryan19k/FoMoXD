import { useContext, useEffect, useRef, useState, useReducer, createContext, useMemo } from 'react';
import { ReactSoundProps } from 'react-sound';
// @ts-ignore
window.soundManager.setup({ debugMode: false });

export const SoundContext = createContext({
  isPlaying: false,
  setIsPlaying: (newState: boolean) => {}
});
const isMute = localStorage.getItem('isMute') ? true : false;

export default function SoundProvider(props: any) {
  const { children } = props;
  const [isPlaying, setIsPlaying] = useState<boolean>(!isMute);
  const value = { isPlaying, setIsPlaying };
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound() {
  return useContext(SoundContext);
}
