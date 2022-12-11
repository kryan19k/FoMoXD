import { ethers, upgrades } from "hardhat";

async function main() {
  const [deployer, dev1, dev2] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  /* ------------------------ ERC20 ----------------------- */
  const FoMoERC20 = await ethers.getContractFactory("FoMoERC20");
  const foMoERC20 = await FoMoERC20.deploy(10 ** 6, "FoMoERC20", "FXD");
  console.log(`[FoMoERC20] Deployed to ${foMoERC20.address}`);
  /* ----------------------- ERC721 ----------------------- */
  const FoMoERC721 = await ethers.getContractFactory("FoMoERC721");
  const foMoERC721 = await upgrades.deployProxy(FoMoERC721, [
    "fomoERC721",
    "FMO",
  ]);
  console.log(`[FoMoERC721] Deployed to ${foMoERC721.address}`);
  /* --------------------- PlayerBook --------------------- */
  const PlayerBook = await ethers.getContractFactory("PlayerBook");
  const playerBook = await PlayerBook.deploy();
  console.log(`[PlayerBook] Deployed to ${playerBook.address}`);
  /* ----------------------- Divies ----------------------- */
  const Divies = await ethers.getContractFactory("Divies");
  const divies = await Divies.deploy();
  console.log(`[Divies] Deployed to ${divies.address}`);
  /* ---------------------- Community --------------------- */
  const Community = await ethers.getContractFactory("Community");
  const community = await Community.deploy(
    [deployer.address, dev1.address, dev2.address],
    2
  );
  console.log(`[Community] Deployed to ${community.address}`);
  /* ----------------------- FoMoXD ----------------------- */
  const FoMoXD = await ethers.getContractFactory("FoMoXD");
  const foMoXD = await FoMoXD.deploy(
    playerBook.address,
    community.address,
    foMoERC20.address,
    foMoERC721.address,
    divies.address
  );
  console.log(`[FoMoXD] Deployed to ${foMoXD.address}`);

  const otherFoMo = await FoMoXD.deploy(
    playerBook.address,
    community.address,
    foMoERC20.address,
    foMoERC721.address,
    divies.address
  );
  console.log(`[Other FoMoXD] Deployed to ${otherFoMo.address}`);
  await foMoXD.setOtherFomo(otherFoMo.address);

  // TODO: Just For testing
  await foMoXD.activate();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});