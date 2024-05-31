"use client";

import { useRef, useState } from "react";
import { AudioPlayer } from "#src/lib/audio-player";

export function Samples() {
  const ref = useRef<AudioPlayer | null>(null);

  function audioPlayer() {
    if (ref.current !== null) {
      return ref.current;
    }
    const player = new AudioPlayer();
    ref.current = player;
    return player;
  }

  const handleClick = (sample: number) => async () => {
    if (!audioPlayer().ready) {
      await audioPlayer().init();
    }
    audioPlayer().play(sample);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button label="Sample 1" onClick={handleClick(0)} />
      <Button label="Sample 2" onClick={handleClick(1)} />
    </div>
  );
}

type Props = {
  label: string;
  onClick: () => void;
};

function Button(props: Props) {
  return (
    <button
      onClick={props.onClick}
      className="flex items-center px-3 py-2 hover:bg-green-700 transition-colors ease-in bg-green-600 font-semibold text-green-50"
    >
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
      <span className="ml-2">{props.label}</span>
    </button>
  );
}
