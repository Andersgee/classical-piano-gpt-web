import { create } from "zustand";

type PlayerStore = {
  isPlayingIdx: number | null;
};

export const usePlayerStore = create<PlayerStore>()((set) => ({
  isPlayingIdx: null,
}));

export function setIsPlayingIdx(isPlayingIdx: number | null) {
  usePlayerStore.setState({ isPlayingIdx });
}
