"use client";

import { useRef } from "react";
import { AudioPlayer } from "#src/lib/audio-player";
import { SAMPLES } from "#src/lib/SAMPLES";
import { cn } from "#src/utils/cn";
import { usePlayerStore } from "#src/store/player";

export function Samples() {
  const ref = useRef<AudioPlayer | null>(null);
  function getAudioPlayer() {
    if (ref.current !== null) {
      return ref.current;
    }
    const player = new AudioPlayer();
    ref.current = player;
    return player;
  }

  const isPlayingIdx = usePlayerStore((s) => s.isPlayingIdx);

  const handleClick = (sample: number) => async () => {
    if (!getAudioPlayer().ready) {
      await getAudioPlayer().init();
    }
    if (isPlayingIdx === sample) {
      getAudioPlayer().stop();
    } else {
      getAudioPlayer().play(sample);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {SAMPLES.map((str, i) => (
        <button
          key={i}
          onClick={handleClick(i)}
          className={cn(
            "flex items-center px-3 py-2 transition-colors ease-in font-semibold",
            isPlayingIdx === i
              ? "bg-green-500 hover:bg-green-600 text-green-50"
              : "bg-purple-500 hover:bg-purple-600 text-purple-50"
          )}
        >
          {isPlayingIdx === i ? <IconPause /> : <IconPlay />}
          <span className="ml-2">{str}</span>
        </button>
      ))}
    </div>
  );
}

function IconPlay() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function IconStop() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
    </svg>
  );
}

function IconPause() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="14" y="4" width="4" height="16" rx="1" />
      <rect x="6" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}
