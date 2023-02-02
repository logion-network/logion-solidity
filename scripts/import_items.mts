// This script imports tokens (see tokens.mts) by adding
// items to a logion Collection.
//
// You may adjust the parameters in tokens.mts file.

import { generateEthereumTokenItemId, LogionClient, KeyringSigner, ClosedCollectionLoc, MimeType, HashOrContent, ItemFileWithContent, ItemTokenWithRestrictedType, TokenType } from '@logion/client';
import { UUID } from "@logion/node-api";
import { Keyring } from '@polkadot/api';
import { waitReady } from "@polkadot/wasm-crypto";
import { exit } from 'process';
import FormData from "form-data";
import { TOKENS, NONCE, COLLECTION_LOC_ID, CONTRACT_ADDRESS, TOKEN_TYPE, SURI, KEY_TYPE, RPC, DIRECTORY } from "./tokens.mts";

async function main() {
  await waitReady();
  const keyring = new Keyring();
  const keypair = keyring.addFromUri(SURI, undefined, KEY_TYPE);
  const signer = new KeyringSigner(keyring);

  const client = await LogionClient.create({
      rpcEndpoints: [ RPC ],
      directoryEndpoint: DIRECTORY,
      formDataLikeFactory: () => new FormData(),
  });

  console.log(`Authenticating as ${keypair.address}`);
  const authenticatedClient = await client.authenticate([ keypair.address ], signer);
  const locs = await authenticatedClient.locsState();
  const collectionLoc = locs.findById(UUID.fromDecimalStringOrThrow(COLLECTION_LOC_ID));
  if(!(collectionLoc instanceof ClosedCollectionLoc)) {
    throw new Error("The collection LOC must be closed in order to import items");
  }

  let closedCollectionLoc = collectionLoc;
  for(const token of TOKENS) {
    console.log(`Importing token ${token.id}`);

    const itemId = generateEthereumTokenItemId(NONCE, token.id);
    const itemToken: ItemTokenWithRestrictedType = {
      type: TOKEN_TYPE,
      id: `{"contract":"${CONTRACT_ADDRESS}","id":"${token.id}"}`,
    };
    const itemFiles = token.files.map(file => new ItemFileWithContent({
      name: file.name,
      contentType: MimeType.from(file.mimeType),
      hashOrContent: HashOrContent.fromContent(file.path),
    }));

    closedCollectionLoc = await closedCollectionLoc.addCollectionItem({
      itemId,
      itemToken,
      itemFiles,
      signer,
      itemDescription: token.description,
      restrictedDelivery: token.restrictedDelivery,
      creativeCommons: token.creativeCommons,
      specificLicenses: token.specificLicenses,
      logionClassification: token.logionClassification,
    }) as ClosedCollectionLoc;
  }

  await client.disconnect();
}

main().catch((error) => {
  console.error(error);
  exit(1)
});
