
// const {ethers} = require('hardhat');

const main = async() =>{
    console.log("Hello");
    const tinderFactory = await hre.ethers.getContractFactory("TinderERC721");
    const tinderContract = await tinderFactory.deploy();
    await tinderContract.deployed();
    console.log("Tinder Contract Address: ",tinderContract.address);
}

main()
    .then(() =>process.exit(0))
    .catch(err =>{
        console.log("Error in deploying contract",err);
        process.exit(1);
    })