import { useContract } from "@thirdweb-dev/react";

const getNFTAddress = () => {
    return process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS ?? "";
};

export const useNFTContract = () => {
    const nft_address = getNFTAddress();
    const { contract: nft_contract, isLoading: nftLoading } =
        useContract(nft_address);
    return { nft_contract, nftLoading };
};