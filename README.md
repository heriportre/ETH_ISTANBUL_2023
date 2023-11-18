
# Suppose You're Ronaldo

This app bringing the [ERC-6551](https://eips.ethereum.org/EIPS/eip-6551) which also known as Token Bound Accounts.

What Token Bound Accounts do is give wallets to NFTs. In this way, NFTs transform from just being assets to becoming wallets with memories, capable of triggering on-chain transactions.

Do you have any kind of jersey? Get a signature from the jersey's owner; and make your jersey even more valuable.



## Examples

Since Ronaldo doesn't have a wallet yet, he can't mint NFTs, but if he did, the signature NFT would be exclusive to him. Therefore, a signature NFT (or ERC-1155) coming from Ronaldo's wallet to any other NFT wallet will create a significant difference in value.

So know, suppose you're Ronaldo, and give it a try.


## Deployment

To deploy this project, clone the repo and add .env

```bash
  git clone https://github.com/oguzutku1745/Chiliz-Web3-Bootcamp-FinalProject/
  cd Chiliz-Web3-Bootcamp-FinalProject
```

You need 4 different contract addresses. 
- First one can be any NFT collection which can be directly deployed from Thirdweb.

- Signature NFT of Ronaldo (Can be ERC-721 or ERC-1155. ERC-1155 makes more sense)

- [ERC6551Registry](https://spicy-explorer.chiliz.com/address/0x55942f237C32dFEc9F04a82ef0C2b0671565a8Ee/contracts#address-tabs)

- [ERC6551Account (Implementation Contract)](https://spicy-explorer.chiliz.com/address/0x6A7eA5d2851939e367b31b96aD60EBE6B49B6E9b/contracts#address-tabs)

First NFT's address should be changed with `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS`, Signature NFT should be changed with "signature" variable.

No need to change the Registry and Implementation contract for this project.

If you want to add more utility, please feel free to change the implementation contract; and give more freedom to NFT's wallets.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_CLIENT_ID` (Derive it from https://thirdweb.com/)

`NEXT_PUBLIC_NFT_CONTRACT_ADDRESS `

`NEXT_PUBLIC_NETWORK = "SpicyChain"`

`NEXT_PUBLIC_RPC_URL = "https://spicy-rpc.chiliz.com/"`


## Screenshots

You can create a Token Bound Account (can be think as wallet for our case) from Homepage
![Creating Wallet for NFT](https://i.imgur.com/vOciD4v.png)

After sending signature NFT to that wallet, you can check the signature!
![Signature Check](https://i.imgur.com/CsazSb9.png)



## Contributing

Pull requests are welcome. If you're considering major changes, kindly open an issue first to discuss your proposed alterations.

