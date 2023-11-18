import React from "react"
import Image from "next/image"
import VerifySigCard from "@/components/VeriySign"
import { useAddress, useOwnedNFTs } from "@thirdweb-dev/react";
import { useNFTContract } from "@/utils/getContract";


export default function CheckSignature() {

    const address = useAddress();
    const {nft_contract} = useNFTContract();
    console.log(address)
    const {data:ownedNFTs, isLoading, error} = useOwnedNFTs(nft_contract, address)

    return(
        <div className="flex flex-col w-screen justify-center items-center">
            <div className="flex flex-col w-screen p-20 justify-center items-center gap-y-10">
            <h1>You can check if your jersey has signature or not from this page. Maybe you are lucky 😊</h1>
            </div>
            <div>
            {isLoading ? <div>Loading NFT Data...</div> : <div className='flex flex-col gap-y-10'>
                    {ownedNFTs && ownedNFTs.map((nft:any,id:any) => (
                        <VerifySigCard key={id} {...nft} />
                    ))}
                    </div>}
            </div>
        </div>
    )
}