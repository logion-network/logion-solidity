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
      expect(await contract.getItemId(0)).to.equal("0x332e9c2d47dbe5d228518a955c84747782af7751f08130d3c3d5d24925eeeee2");
    });

    it("Should compute expected certificate URL", async () => {
      const { contract } = await loadFixture(deploy);
      expect(await contract.getCertificateUrl(0)).to.equal("https://certificate.logion.network/public/certificate/334801581596596632473758891935041239976/0x332e9c2d47dbe5d228518a955c84747782af7751f08130d3c3d5d24925eeeee2");
    });
  });
});
