import { base64urlFromUint8Array } from "#src/lib/base64url";
import { Tokenizer } from "#src/lib/tokenizer";
import fs from "node:fs/promises";

const tokenizer = new Tokenizer();

async function main() {
  const entries = await fs.readdir("public/generated3", {
    withFileTypes: true,
  });
  for (const entry of entries) {
    const inPath = `public/generated3/${entry.name}`;
    const outPath = `public/generated_tokenized/${
      entry.name.split(".txt")[0]
    }.b64url`;

    const str = await fs.readFile(inPath, { encoding: "utf8" });
    const vec = new Uint8Array(JSON.parse(`[${str}]`));

    //const encoded_vec = tokenizer.encode(vec); //the generated is already tokenized
    const b64_str = base64urlFromUint8Array(vec);

    await fs.writeFile(outPath, b64_str);
  }
}

void main();
