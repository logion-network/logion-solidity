// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./Logion.sol";

contract Example is Logion, ERC1155 {
    mapping(uint256 => bool) public minted;

    constructor()
        ERC1155("https://some.domain/{id}.json")
        Logion(
            Strings.toHexString(address(this)),
            "334801581596596632473758891935041239976",
            "certificate.logion.network"
        )
    {
    }

    function mint(uint256 _tokenId)  public {
        require(!minted[_tokenId], "NFT already minted");
        _mint(msg.sender, _tokenId, 1, "");
        minted[_tokenId] = true;
    }
}
