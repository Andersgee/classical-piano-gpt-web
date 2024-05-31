/**
 * simplified from [swansontec/rfc4648](https://github.com/swansontec/rfc4648.js)
 * for the special case of base64url alphabet without padding
 * eg `base64url.parse(str, { loose: true })`
 *
 * with node:Buffer, this is the equivalent of `buffer = Buffer.from(str, "base64url")`
 */
export function uint8ArrayFromBase64url(str: string) {
  const out = new Uint8Array(((str.length * ENCODING.bits) / 8) | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (const char of str) {
    const value = ENCODING.codes[char];
    if (value === undefined) throw new SyntaxError(`Invalid character ${char}`);
    buffer = (buffer << ENCODING.bits) | value;
    bits += ENCODING.bits;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 0xff & (buffer >> bits);
    }
  }

  if (bits >= ENCODING.bits || 0xff & (buffer << (8 - bits))) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
}

export function base64urlFromUint8Array(data: Uint8Array): string {
  let out = "";
  let bits = 0;
  let buffer = 0;
  const mask = (1 << ENCODING.bits) - 1; //63
  for (const value of data) {
    buffer = (buffer << 8) | (0xff & value);
    bits += 8;
    while (bits > ENCODING.bits) {
      bits -= ENCODING.bits;
      out += ENCODING.chars[mask & (buffer >> bits)];
    }
  }

  if (bits) {
    out += ENCODING.chars[mask & (buffer << (ENCODING.bits - bits))];
  }
  return out;
}

const ENCODING: { chars: string; bits: number; codes: Record<string, number> } =
  {
    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bits: 6,
    codes: {
      "A": 0,
      "B": 1,
      "C": 2,
      "D": 3,
      "E": 4,
      "F": 5,
      "G": 6,
      "H": 7,
      "I": 8,
      "J": 9,
      "K": 10,
      "L": 11,
      "M": 12,
      "N": 13,
      "O": 14,
      "P": 15,
      "Q": 16,
      "R": 17,
      "S": 18,
      "T": 19,
      "U": 20,
      "V": 21,
      "W": 22,
      "X": 23,
      "Y": 24,
      "Z": 25,
      "a": 26,
      "b": 27,
      "c": 28,
      "d": 29,
      "e": 30,
      "f": 31,
      "g": 32,
      "h": 33,
      "i": 34,
      "j": 35,
      "k": 36,
      "l": 37,
      "m": 38,
      "n": 39,
      "o": 40,
      "p": 41,
      "q": 42,
      "r": 43,
      "s": 44,
      "t": 45,
      "u": 46,
      "v": 47,
      "w": 48,
      "x": 49,
      "y": 50,
      "z": 51,
      "0": 52,
      "1": 53,
      "2": 54,
      "3": 55,
      "4": 56,
      "5": 57,
      "6": 58,
      "7": 59,
      "8": 60,
      "9": 61,
      "-": 62,
      "_": 63,
    },
  };
