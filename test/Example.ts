import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Example", function () {

  async function deploy() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Example = await ethers.getContractFactory("Example");
    const contract = await Example.deploy();

    return { contract, owner, otherAccount };
  }

  describe("Functions", () => {

    it("Should return expected collection LOC ID", async () => {
      const { contract } = await loadFixture(deploy);
      expect(await contract.getCollectionLocId()).to.equal("334801581596596632473758891935041239976");
    });

    it("Should compute expected item ID", async () => {
      const { contract } = await loadFixture(deploy);
      expect(await contract.getItemId(0)).to.equal("0xac82d44aa7abdb4b08a1aaab3fa3a94559ba5e57a0068e56b19417708c2ced48");
    });

    it("Should compute expected certificate URL", async () => {
      const { contract } = await loadFixture(deploy);
      expect(await contract.getCertificateUrl(0)).to.equal("https://certificate.logion.network/public/certificate/334801581596596632473758891935041239976/0xac82d44aa7abdb4b08a1aaab3fa3a94559ba5e57a0068e56b19417708c2ced48");
    });
  });
});
