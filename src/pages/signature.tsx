import React from "react"
import { useAddress, useMintNFT, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { MintMetadata } from "@/types/mintMetadata";
import Image from "next/image";
import SignatureCard from "@/components/SignNFT";

export default function Signature() {
    const address = useAddress();

    const signature = "0x3a3EbED10f8db8537FFA8Aa17E5071f65800D0A2"

    console.log(address)
    
    const { contract: signContract, isLoading: nftLoading } =
    useContract(signature);
    
    const {data:ownedNFTs, isLoading:isOwner} = useOwnedNFTs(signContract, address)
  
    const {
      mutate: mintNft,
      isLoading,
      error,
    } = useMintNFT(signContract);
  
    const handleMint = async (event: React.FormEvent) => {
      event.preventDefault();
  
      const name = "messi Signature";
      const description = "To make your formas more valuable, send his signature to their wallets.";
      const image = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Firma_de_Lionel_Messi.svg/2560px-Firma_de_Lionel_Messi.svg.png";
  
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
    return(
        <div className="flex flex-col w-screen justify-center items-center">
            <div className="flex flex-col w-screen h-screen justify-center items-center gap-y-10">

            <h1>This page will be specifically for Messi&apos;s minting page or another famous player&apos;s. </h1>

            <h1>To sign the forma, he should mint a signature NFT and transfer it to  the Forma.</h1>
              <div className="relative text-white p-6 rounded-lg shadow-md max-w-2xl text-center" style={{background: "white"}}>
                <div className="m-5">
                  <Image 
                    src="/imza.png"
                    alt="messi signature"
                    height="100"
                    width="350"
                  />
                </div>
                <button
                  className="mt-6 bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
                  onClick={handleMint}
                  disabled={isLoading}
                >
                  {isLoading ? 'Minting...' : 'Mint messi Signature'}
                </button>
              </div>
            </div>
            <div>
            {isLoading ? <div>Loading NFT Data...</div> : <div className='flex flex-col gap-y-10'>
                    {ownedNFTs && ownedNFTs.map((nft:any,id:any) => (
                        <SignatureCard key={id} {...nft} />
                    ))}
                    </div>}
            </div>
        </div>
    )

}
