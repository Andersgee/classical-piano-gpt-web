import { TOKENS } from "./TOKENS";

export class Tokenizer {
  //tokens: (number | [number, number])[];
  //indexed_tokens: { token: number | [number, number]; idx: number }[];
  constructor() {
    //this.tokens = TOKENS;
    //this.indexed_tokens = TOKENS.map((token, idx) => ({ token, idx }));
  }

  decode(uintvec: Uint8Array) {
    const vec = Array.from(uintvec); //copy and also typedarray does not have splice

    let indexed_tokens = TOKENS.map((token, idx) => ({ token, idx }));

    while (indexed_tokens.length > 0) {
      const { token, idx } = indexed_tokens.pop()!; //important to start from last token
      if (typeof token === "number") {
        continue;
      }

      for (let i = 0; i < vec.length; i++) {
        if (vec[i] === idx) {
          //replace vec[i] with [token[0],token[1]]
          vec.splice(i, 1, token[0], token[1]);
        }
      }
    }
    return vec;
  }

  encode(uintvec: Uint8Array) {
    const vec = Array.from(uintvec); //copy and also typedarray does not have splice
    let indexed_tokens = TOKENS.map((token, idx) => ({ token, idx }));

    while (indexed_tokens.length > 0) {
      const { token, idx } = indexed_tokens.shift()!; //important to start from first token
      if (typeof token === "number") {
        continue;
      }

      for (let i = 0; i < vec.length; i++) {
        if (
          i < vec.length - 1 &&
          vec[i] === token[0] &&
          vec[i + 1] === token[1]
        ) {
          //replace [vec[i],vec[i+1]] with [idx]
          vec.splice(i, 2, idx);
        }
      }
    }
    return vec;
  }
}
