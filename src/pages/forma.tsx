import { useNFTContract } from "@/utils/getContract";
import { useAddress, useMintNFT, useSigner } from "@thirdweb-dev/react";
import React from "react";
import { useAccount } from "wagmi";
import { MintMetadata } from "@/types/mintMetadata";
import Image from "next/image";

export default function Forma() {
  const address = useAddress();

  const { nft_contract } = useNFTContract();
  const signer = useSigner(); 

    console.log(signer)

  const {
    mutate: mintNft,
    isLoading,
    error,
  } = useMintNFT(nft_contract);

  const handleMint = async (event: React.FormEvent) => {
    event.preventDefault();

    const name = "CR7 Shirt";
    const description = "This is for the memorial of the old legend, Cr7; which everyone knows for his hard work.";
    const image = "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt250301c1cdcbb6f8/635258755ec95d10f430b9fd/Cristiano_Ronaldo_dark.jpg?auto=webp&format=pjpg&width=3840&quality=60";

    const metadata: MintMetadata = {
      metadata: {
        image,
        name,
        description,
      },
      to: address ?? "",
      supply: 1,
    };

    try {
        mintNft(metadata);
    } catch (e) {
      console.error("Minting failed", e);
    }
  };

  // If there's an error, you might want to handle it by displaying a message to the user
  if (error) {
    console.error("Minting error:", error);
  }

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <div className="flex flex-col w-screen h-screen justify-center items-center gap-y-10">
      <h1>Mint your Messi jersey, go to Homepage; then click on your jersey to convert it to a wallet.</h1>
      <div className="relative bg-gray-800 text-white p-6 rounded-lg shadow-md max-w-2xl text-center">
        <div className="m-5">
          <Image 
            src="/shirt.webp"
            alt="Cr7 signature"
            height="100"
            width="350"
          />
        </div>
        <button
          className="mt-6 bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
          onClick={handleMint}
          disabled={isLoading}
        >
          {isLoading ? 'Minting...' : 'Mint Cr7 Jersey'}
        </button>
      </div>
      </div>
    </div>
  );
}
