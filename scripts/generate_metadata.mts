// This script generates metadata which are compatible with OpenSea (among
// others) for given tokens (see tokens.mts). The generated JSON follows the
// specification described here:
//
// https://docs.opensea.io/docs/metadata-standards
//
// You may adjust the parameters in tokens.mts file.

import { generateEthereumTokenItemId } from "@logion/client";
import { writeFile, mkdir } from "fs/promises";
import { exit } from "process";
import { TOKENS, NONCE, CERTIFICATE_HOST, COLLECTION_LOC_ID } from "./tokens.mjs";

async function main() {
  const metadataFolder = "sample_metadata";
  await mkdir(metadataFolder, { recursive: true });

  for(const token of TOKENS) {
    const metadata = {
      ...token,
      properties: {
        ...token.properties,
        collection_loc_id: COLLECTION_LOC_ID,
        item_id: generateEthereumTokenItemId(NONCE, token.id),
      },
      external_url: certificateUrl(NONCE, token.id),
    };

    await writeFile(
      `${metadataFolder}/${token.id}.json`,
      JSON.stringify(metadata, undefined, 4)
    );
  }
}

function certificateUrl(nonce: string, tokenId: string): string {
  return `https://${CERTIFICATE_HOST}/public/certificate/${COLLECTION_LOC_ID}/${generateEthereumTokenItemId(nonce, tokenId)}`;
}

main().catch((error) => {
  console.error(error);
  exit(1);
});
