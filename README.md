# logion Smart Contracts

Smart contracts establishing the link between your tokens and the logion network.

Currently, a single contract is provided: `Logion`. This contract links an NFT (e.g. ERC721 or ERC1155)
to a logion collection item.

## Overview

### Installation

```console
$ yarn install --dev @logion/solidity-contracts
```

### Usage

Once installed, you can use the contract in the library by importing them:

```solidity
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@logion/contracts/Logion.sol";

contract MyCollectible is ERC1155, Logion {
    constructor()
        ERC1155("https://some.domain/{id}.json")
        Logion(
            Strings.toHexString(address(this)), // The address of the contract is being used to generate a unique item ID per token
            "334801581596596632473758891935041239976", // The collection LOC ID
            "certificate.logion.network" // The domain for building a logion certificate URL
        )
    {
    }
}
```
