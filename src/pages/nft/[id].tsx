import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useNFTContract } from "@/utils/getContract";
import { useNFT } from "@thirdweb-dev/react";
import NFTDetails from "@/components/NFTDetails";
import TransferCard from "@/components/Transfer";
import Converter6551 from "@/components/6551Converter";

function NFTDetailsPage() {
    const router = useRouter();
    const [nftID, setNftID] = useState("NFTDetails");

    const {nft_contract} = useNFTContract();


    const {data:nft,isLoading:isNFTLoading} = useNFT(nft_contract, nftID)

    useEffect(() => {
        if (typeof window !== "undefined") {
            const { id } = router.query;
            setNftID(id as string);
        }

    }, [router.query]);

    return (
        <div className="flex flex-col w-screen h-screen justify-center items-center">
          <h1 className="text-6xl font-semibold my-4 text-center">
            NFT Details
          </h1>
      
          {isNFTLoading || !nft ? (
            <div className="text-center">
              {`Loading NFT with id ${nftID}`}
            </div>
          ) : (
            <>
              <NFTDetails {...nft} />
              <TransferCard id={nftID} />
              <Converter6551 id={nftID} />
            </>
          )}
      
        </div>
      );
}
export default NFTDetailsPage;
