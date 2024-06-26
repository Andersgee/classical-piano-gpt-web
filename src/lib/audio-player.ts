import { setIsPlayingIdx, setIsReady } from "#src/store/player";
import { SAMPLES } from "./SAMPLES";
import { uint8ArrayFromBase64url } from "./base64url";
import { uint8ArrayFromTxt } from "./text";
import { Tokenizer } from "./tokenizer";

const tokenizer = new Tokenizer();

const STEPS_PER_SECOND = 24 * 4;

export class AudioPlayer {
  audio: AudioContext;
  notes: AudioBuffer[];
  sequences: Record<number, number[]>;
  intervalId: NodeJS.Timeout | null;
  step: number;
  ready: boolean;

  constructor() {
    this.audio = new AudioContext();
    this.notes = [];
    this.ready = false;
    this.intervalId = null;
    this.step = 0;
    this.sequences = {};
  }

  async init() {
    const promises = Array.from({ length: 88 }).map((_, i) =>
      fetchnote(i).then((buf) => this.audio.decodeAudioData(buf))
    );
    this.notes = await Promise.all(promises);
    this.ready = true;
    setIsReady(true);
  }

  async play(idx: number) {
    this.stop();
    if (!this.sequences[idx]) {
      //const v = await fetchsequence_txt(`/generated3/${SAMPLES[idx]}.txt`);
      const v = await fetchsequence_b64(`/generated/${SAMPLES[idx]}.b64url`);
      this.sequences[idx] = tokenizer.decode(v);
    }

    this.intervalId = setInterval(() => {
      if (this.sequences[idx][this.step] > 0) {
        let note = int_to_note_index(this.sequences[idx][this.step]);
        //console.log("playing note n:", n);
        this.playnote(note, 0.5);
      }
      this.step += 1;
      if (this.step > this.sequences[idx].length) {
        this.stop();
      }
    }, 1000 / STEPS_PER_SECOND);
    setIsPlayingIdx(idx);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.step = 0;
    setIsPlayingIdx(null);
  }

  playnote(n: number, v: number) {
    if (!this.notes[n]) {
      console.log("does not exist, note n:", n);
      return;
    }
    const source = this.audio.createBufferSource();
    source.buffer = this.notes[n];

    const gain = this.audio.createGain();
    gain.gain.value = v * 1.0;

    source.connect(gain).connect(this.audio.destination);
    source.start();
  }
}

async function fetchnote(n: number) {
  const path = `/notes/n${n + 1}.mp3`;
  const res = await fetch(path);
  const buf = await res.arrayBuffer();
  return buf;
}

async function fetchsequence_b64(path: string) {
  const res = await fetch(path);
  const text = await res.text();
  return uint8ArrayFromBase64url(text);
}
async function fetchsequence_txt(path: string) {
  const res = await fetch(path);
  const text = await res.text();
  return uint8ArrayFromTxt(text);
}

function int_to_note_index(int: number) {
  //i=1 is piano key 1 (aka note index 0)
  return int - 1;
}

function midikey_to_int(k: number) {
  //key=21 is pianokey=1
  //leave 0 alone
  //(this is how midi is parsed and saved)
  return k - 20;
}
