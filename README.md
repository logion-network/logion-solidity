# logion Smart Contracts

Smart contracts establishing the link between your tokens and the logion network.

Currently, a single contract is provided: `Logion`. This contract links an NFT (e.g. ERC721 or ERC1155)
to a logion collection item. Note that the metadata associated with your tokens should also include
logion properties (see Scripts > Generating metadata below).

In order to fully protect your tokens, in addition to implementing the above contract, collection items
must be created in the logion network. This will establish a bi-directional link between logion and your tokens.
This project provides some scripts provided as an example of how to add items to a logion collection.

## Overview

### Installation

```console
$ yarn add --dev @logion/solidity
```

### Usage

Once installed, you can use the contract in the library by importing them:

```solidity
pragma solidity ^0.8.0;

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

## Scripts

### Adding items to a collection

** WARNING: the items created by this script do not have any file nor are linked to an actual token, it should only be used for testing purpose or as a starting point to writing your own item creation logic.**

This [script](https://github.com/logion-network/logion-solidity/blob/main/scripts/import_items_test.mts) is a very simple
example of how to add items to a collection LOC programmatically.

### Generating metadata

It is advised to generate the metadata linked to your tokens programmatically
and to include logion data. This repository contains
[an example script](https://github.com/logion-network/logion-solidity/blob/main/scripts/generate_metadata.mts)
which can be executed with the following command:

```
yarn generate-sample-metadata
```

This will generate the metadata JSON files in folder `sample_metadata`.
See the code of the script for more details. The parameters of the script can be
found [here](https://github.com/logion-network/logion-solidity/blob/main/scripts/tokens.mts).

This is just an example, developers should copy the script in their own project and
ajust it for their needs.

### Importing tokens into a logion collection

** WARNING: the script described below actually submits transactions to the logion chain. As a result, fees are applied and submitted data can not be corrected later.**

It is advised to import your tokens programmatically. This repository contains
[an example script](https://github.com/logion-network/logion-solidity/blob/main/scripts/import_items.mts)
which can be executed with the following command:

```
yarn import-sample-items
```

This will add one item per token into a given logion collection.
See the code of the script for more details. The parameters of the script can be
found [here](https://github.com/logion-network/logion-solidity/blob/main/scripts/tokens.mts).

This is just an example, developers should copy the script in their own project and
ajust it for their needs.
