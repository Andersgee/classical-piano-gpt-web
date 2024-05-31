/**
 * I saved generated as strings like "60, 65, 103"
 *
 * lets just parse it client side like this
 * */
export function uint8ArrayFromTxt(str: string) {
  return new Uint8Array(JSON.parse(`[${str}]`));
}
