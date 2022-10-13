// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.17;

import "@openzeppelin/contracts/utils/Strings.sol";

contract Logion {
    string contractAddress;
    string collectionLocId;
    string certHost;

    constructor(string memory _contractAddress, string memory _collectionLocId, string memory _certHost) {
        contractAddress = _contractAddress;
        collectionLocId = _collectionLocId;
        certHost = _certHost;
    }

    function getCollectionLocId() external view returns (string memory) {
        return collectionLocId;
    }

    function getItemId(uint256 tokenId) external view returns (string memory) {
        string memory itemId = string.concat(
            contractAddress,
            Strings.toString(tokenId)
        );
        uint256 hash = uint256(sha256 (bytes(itemId)));
        return Strings.toHexString(hash);
    }

    function getCertificateUrl(uint256 tokenId) external view returns (string memory) {
        string memory itemId = this.getItemId(tokenId);
        return string.concat(
            "https://",
            certHost,
            "/public/certificate/",
            collectionLocId,
            "/",
            itemId
        );
    }
}
