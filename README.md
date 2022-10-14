# logion Smart Contracts

Smart contracts establishing the link between your tokens and the logion network.

Currently, a single contract is provided: `Logion`. This contract links an NFT (e.g. ERC721 or ERC1155)
to a logion collection item.

## Overview

### Installation

```console
$ yarn add --dev @logion/solidity
```

### Usage

Once installed, you can use the contract in the library by importing them:

```solidity
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@logion/solidity/contracts/Logion.sol";

contract MyCollectible is ERC1155, Logion {
    constructor()
        ERC1155("https://some.domain/{id}.json")
        Logion(
            "202210131727", // Must be unique across all contracts minting tokens for below collection LOC
            "334801581596596632473758891935041239976", // The collection LOC ID
            "certificate.logion.network" // The domain for building a logion certificate URL
        )
    {
    }
}
```

## Generating metadata

It is advised to generate the metadata linked to your tokens programmatically
and to include logion data. This repository contains
[an example script](https://github.com/logion-network/logion-solidity/blob/main/scripts/generate_metadata.ts)
which can be executed with the following command:

```
yarn generate-sample-metadata
```

This will generate the metadata JSON files in folder `sample_metadata`.
See the code of the script for more details.

This is just an example, developers should copy the script in their own project and
ajust it for their needs.
