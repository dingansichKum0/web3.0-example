import { ethers } from "hardhat";

async function main() {
  const factory = await ethers.getContractFactory("HelloWorld");
  const cont: any = await factory.deploy();

  await cont.deployed();

  console.log("address: ", cont.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
