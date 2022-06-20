const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
  const gameContract = await gameContractFactory.deploy(
    ["Ben", "Seamus", "Dave"],       // Names
    ["https://i.ytimg.com/vi/k1R53U9lNcM/maxresdefault.jpg", // Images
    "https://i.ytimg.com/vi/gm_LXGn5I7E/hqdefault.jpg",
    "https://c.tenor.com/qOonL9eKVfAAAAAd/i-agree-dave-rubin.gif"],
    [100, 200, 300],                    // HP values
    [80, 50, 25],                       // Attack damage values
    [3, 5, 4],                       // Critical chance values
    [3, 3, 4],                       // Attack damage values
    "AoC", // Boss name
    "https://i.imgflip.com/4wrigu.png", // Boss image
    10000, // Boss hp
    50 // Boss attack damage
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  let txn;
  // We only have three characters.
  // an NFT w/ the character at index 2 of our array.
  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();