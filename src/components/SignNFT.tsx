import React, { FC, useState } from "react";
import Link from "next/link";
import { NFT, ThirdwebNftMedia, useContract } from "@thirdweb-dev/react";

const SignatureCard: FC<NFT> = (nft) => {

    const [address, setAddress] = useState("")
    const handleAddresChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };

    const signature = "0x3a3EbED10f8db8537FFA8Aa17E5071f65800D0A2"

    const { contract: signContract, isLoading: nftLoading } =
    useContract(signature);

    const handleTransfer = () => {
        try{
            if(signContract){
            signContract.erc721.transfer(address,nft.metadata.id)
            }
        } catch(e) {
            console.log("Error Transfer")
        }
       
    };
    console.log(nft)

    return (
        <div className="relative bg-gray-800 text-white p-10 rounded-lg shadow-md items-center flex flex-col justify-between"> {/* Add flex-col and justify-between */}

          <ThirdwebNftMedia
            metadata={nft.metadata}
            style={{ maxHeight: 200 }}
          />

          <div className="mt-4"> {/* Add margin-top to separate from the media */}
            <h2 className="text-2xl font-bold mb-2 text-center">
              {nft.metadata.name}
            </h2>
            <p className="mb-2 text-gray-400">
              {nft.metadata.description}
            </p>
          </div>
          <div> {/* This div wraps input and button */}
            <div className="flex flex-col mb-2 text-center gap-y-2">
              <label className="font-bold text-xl">Recipient:</label>
              <input
                className="bg-gray-700 text-white p-2 rounded w-full placeholder:text-center"
                placeholder="Address"
                type="text"
                value={address}
                onChange={handleAddresChange}
              />
            </div>
            {signContract && (
              <button
                onClick={handleTransfer}
                className="bg-blue-700 text-white font-bold mt-1 py-2 px-4 rounded w-full " /* Use w-full or adjust width as needed */
              >
                Send
              </button>
            )}
          </div>
        </div>
      );
      
};

export default SignatureCard;
