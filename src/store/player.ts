import { create } from "zustand";

type PlayerStore = {
  isReady: boolean;
  isPlayingIdx: number | null;
};

export const usePlayerStore = create<PlayerStore>()((set) => ({
  isReady: false,
  isPlayingIdx: null,
}));

export function setIsPlayingIdx(isPlayingIdx: number | null) {
  usePlayerStore.setState({ isPlayingIdx });
}

export function setIsReady(isReady: boolean) {
  usePlayerStore.setState({ isReady });
}
