// This script adds 10 items to a given logion Collection.
//
// You may adjust the parameters in tokens.mts file.

import { LogionClient, KeyringSigner, ClosedCollectionLoc, ISubmittableResult, SignAndSendStrategy } from '@logion/client';
import { UUID, Hash } from "@logion/node-api";
import { Keyring } from '@polkadot/api';
import { waitReady } from "@polkadot/wasm-crypto";
import { exit } from 'process';
import FormData from "form-data";
import { COLLECTION_LOC_ID, SURI, KEY_TYPE, RPC, DIRECTORY } from "./tokens.mjs";

class InBlockSignAndSendStrategy implements SignAndSendStrategy {
  canUnsub(result: ISubmittableResult): boolean {
    return result.status.isInBlock;
  }
}

async function main() {
  await waitReady();
  const keyring = new Keyring();
  const keypair = keyring.addFromUri(SURI, undefined, KEY_TYPE);
  const signer = new KeyringSigner(keyring, new InBlockSignAndSendStrategy());

  const client = await LogionClient.create({
    rpcEndpoints: [ RPC ],
    directoryEndpoint: DIRECTORY,
      formDataLikeFactory: () => new FormData(),
  });

  console.log(`Authenticating as ${keypair.address}`);
  const accountId = client.logionApi.queries.getValidAccountId(keypair.address, "Polkadot");
  const authenticatedClient = await client.authenticate([ accountId ], signer);
  const locs = await authenticatedClient.locsState();
  const collectionLoc = locs.findById(UUID.fromDecimalStringOrThrow(COLLECTION_LOC_ID));
  if(!(collectionLoc instanceof ClosedCollectionLoc)) {
    throw new Error("The collection LOC must be closed in order to import items");
  }

  let closedCollectionLoc = collectionLoc;
  for(let i = 0; i < 10; ++i) {
    console.log(`Importing token ${i}`);

    const itemId = Hash.of(`${i}`);
    closedCollectionLoc = await closedCollectionLoc.addCollectionItem({
      itemId,
      itemDescription: `Some description for ${i}`,
      signer,
    }) as ClosedCollectionLoc;
  }

  await client.disconnect();
}

main().catch((error) => {
  console.error(error);
  exit(1)
});
