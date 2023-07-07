//TOKEN CONTRACT ADDRESS
const TOKEN_ADDRESS = 0x1;

//NFT COLLECTION ADDRESS
const NFT_ADDRESS = 0x1;

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
  // const runTokenContractAddress = "0xe20ab509edc8f6156068a5a49b8981909ce920aa";
  const runTokenContractABI = [
    "function mintTokens(address account, uint256 amount) public",
  ];
  const runTokenContract = new ethers.Contract(
    TOKEN_ADDRESS,
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
  // const nftContractAddress = "0xc566eecdc13461ff852e4f539f8d563148d2e2ed";
  const mintContactAbi = ["function mint(uint256 amount) public"];
  const nftContract = new ethers.Contract(
    NFT_ADDRESS,
    mintContactAbi,
    provider
  );
  await nftContract.connect(signer).mint(window.totalNFTScore.toString());
}
