//TOKEN CONTRACT ADDRESS
// const TOKEN_ADDRESS = 0xda6bf12679a5c6643aca3389e9c13865128015cc;

//NFT COLLECTION ADDRESS
// const NFT_ADDRESS = 0x656886f287048039439ec7229b9a95aad4e7ef12;

let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;

async function connectMetamask() {
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  console.log("Account address: ", await signer.getAddress());

  // const balance = await signer.getBalance();
  // const convertToEth = 1e18;
  // console.log(
  //   "account's balance in ether: ",
  //   balance.toString() / convertToEth
  // );
}

async function claimTokens() {
  const runTokenContractAddress = "0xda6bf12679a5c6643aca3389e9c13865128015cc";
  const runTokenContractABI = [
    "function mintTokens(address account, uint256 amount) public",
  ];
  const runTokenContract = new ethers.Contract(
    runTokenContractAddress,
    runTokenContractABI,
    provider
  );
  let convertToWei = 1000000000;
  let amountToClaim = window.totalGweiScore * convertToWei;
  await runTokenContract
    .connect(signer)
    .mintTokens(signer.getAddress(), amountToClaim.toString());
}

async function claimNft() {
  const nftContractAddress = "0x656886f287048039439ec7229b9a95aad4e7ef12";
  const mintContactAbi = ["function mint(uint256 amount) public"];
  const nftContract = new ethers.Contract(
    nftContractAddress,
    mintContactAbi,
    provider
  );
  await nftContract.connect(signer).mint(window.totalNFTScore.toString());
}
