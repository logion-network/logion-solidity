import { generateEthereumTokenItemId } from "@logion/client";
import { writeFile, mkdir } from "fs/promises";

// This script generates metadata which are compatible with OpenSea (among
// others). The generated JSON follows the specification described here:
//
// https://docs.opensea.io/docs/metadata-standards
//
// You may adjust the parameters in next section and describe your tokens
// in the next one.

// ------------------- Contract parameters ------------------------------------

// The parameters in this section must match the ones passed to the Logion
// contract constructor

const NONCE = "202210131727";
const CERTIFICATE_HOST = "certificate.logion.network";
const COLLECTION_LOC_ID = "334801581596596632473758891935041239976";

// ------------------------ Tokens --------------------------------------------

const TOKENS: Token[] = [
  {
    id: "0",
    name: "Some name",
    description: "Some description",
    image: "https://some.domain/my-nice-image.png",
    properties: {
      color: "red"
    }
  },
  {
    id: "1",
    name: "Some other name",
    description: "Some other description",
    image: "https://some.domain/my-other-nice-image.png",
    properties: {
      color: "green"
    }
  }
];

// ------------------------ Stop editing here ---------------------------------

interface Token {
  id: string;
  name: string;
  description: string;
  image: string;
  properties: Record<string, string>;
}

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

function certificateUrl(contractAddress: string, tokenId: string): string {
  return `https://${CERTIFICATE_HOST}/public/certificate/${COLLECTION_LOC_ID}/${generateEthereumTokenItemId(contractAddress, tokenId)}`;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
