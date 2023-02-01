// This file defines parameters and token descriptions used by the scripts in the this folder.
// See README and the scripts for more details.

import { CreativeCommons, LogionClassification, SpecificLicense, TokenType } from "@logion/client";
import { KeypairType } from "@polkadot/util-crypto/types";

// ------------------- Contract parameters ------------------------------------

// NONCE and COLLECTION_LOC_ID must match the values passed to the logion
// contract constructor, the other parameters are linked to your smart contract.

export const NONCE = "202210131727";
export const COLLECTION_LOC_ID = "334801581596596632473758891935041239976";

export const CONTRACT_ADDRESS = "0xbd24B4ACe05FA2AdB2EB1450F20603e1a9a6e882";
export const TOKEN_TYPE: TokenType = "ethereum_erc1155";

// ------------------- Connection parameters ----------------------------------

// RPC, CERTIFICATE_HOST and DIRECTORY are the entry points to the logion network.
// You should not have to change the provided values.
//
// SURI is the private key you will use to submit the collection items.
// It is the key with which the logion collection was requested. KEY_TYPE
// should be either ed25519 (the default) or sr25519.

export const RPC = "wss://rpc01.logion.network";
export const CERTIFICATE_HOST = "certificate.logion.network";
export const DIRECTORY = "https://directory.logion.network";

// !!! WARNING !!!: this is a secret key, do not share or publish it (below value is the secret key of well-known user alice).
export const SURI = "0xe5be9a5092b81bca64be81d212e7f2f9eba183bb7a90954f7b76361f6edb5c0a";
export const KEY_TYPE: KeypairType = "ed25519";

// ------------------------ The tokens ----------------------------------------

export const TOKENS: Token[] = [
  {
    id: "0",
    name: "Some name",
    description: "Some description",
    image: "https://some.domain/my-nice-image.png",
    properties: {
      color: "red"
    },
    restrictedDelivery: true,
    files: [
      {
        mimeType: "image/jpeg",
        name: "some-file-name.jpeg",
        path: "sample_data/some-file-name.jpeg",
      }
    ]
  },
  {
    id: "1",
    name: "Some other name",
    description: "Some other description",
    image: "https://some.domain/my-other-nice-image.png",
    properties: {
      color: "green"
    },
    restrictedDelivery: true,
    files: [
      {
        mimeType: "image/jpeg",
        name: "some-other-file-name.jpeg",
        path: "sample_data/some-other-file-name.jpeg",
      }
    ]
  }
];

// ------------------------ Stop editing here ---------------------------------

export interface Token {
  id: string;
  name: string;
  description: string;
  image: string;
  properties: Record<string, string>;
  files: File[];
  restrictedDelivery: boolean;
  logionClassification?: LogionClassification;
  specificLicenses?: SpecificLicense[];
  creativeCommons?: CreativeCommons;
}

export interface File {
  name: string;
  path: string;
  mimeType: string;
}
