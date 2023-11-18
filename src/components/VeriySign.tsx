import React, { FC, useState, useEffect } from "react";
import { NFT, ThirdwebNftMedia, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import {ethers} from "ethers";
import { registerAbi } from "@/utils/registerAbi";

const VerifySigCard: FC<NFT> = (nft) => {
    const [checking, setChecking] = useState(false);
    const [isOwnSign, setIsOwnSign] = useState<null | boolean>(null);
    const [TBAccount,setTBAccount] = useState("")
    const contractAddress = "0xC13c0a003C256ce72AFd743F13d7f11FEa938232";    
    const signature = "0x3a3EbED10f8db8537FFA8Aa17E5071f65800D0A2"
    const address = useAddress();
    const { contract: signContract, isLoading: nftLoading } =
    useContract(signature);
    
    
 //Component first derives the account addres by read account
 //Then, takes this wallet address and transfer it to balanceOf function to verify signature
    
    
    const { data: balance, isLoading: isBalanceLoading, error, refetch: refetchBalance } = useContractRead(signContract, "balanceOf", [TBAccount])

    useEffect(() => {
        if (TBAccount) {
            refetchBalance(); 
        }
    }, [TBAccount, refetchBalance]);


    const handleChecking = async () => {
        setChecking(true);
        try {
          await refetchBalance();
          const balanceInt = balance?.toNumber(); 
          console.log(balanceInt); 
          if (balanceInt > 0) {
              setIsOwnSign(true)
          } else {
            setIsOwnSign(false)
          }
        } catch (error) {
          console.error("Error on checking signature", error);
        } finally {
          setChecking(false);
        }
      };

      useEffect(() => {
        const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
        const contract = new ethers.Contract(contractAddress, registerAbi, provider);
    
        const getAccount = async () => {
          try {
            const account = await contract.account(
                "0x0109F38B41E6Be0dD12e7450D978681E8D6A0194",
                "0x4272696e67696e6720544241277320746f204368696c697a0000000000000000", // https://www.devoven.com/encoding/bytes32-to-string?from=0x4272696e67696e6720544241277320746f204368696c697a0000000000000000
                88882,
                process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
                nft.metadata.id,
            );
            setTBAccount(account || 'No account found for this NFT');
          } catch (error) {
            console.error('Error fetching account', error);
            setTBAccount('Error fetching account');
          }
        };
    
        getAccount();
      }, [nft.metadata.id]);

      console.log(TBAccount)

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
          <div>
          {signContract && (
              <button
                onClick={handleChecking}
                className="bg-blue-700 text-white font-bold mt-1 py-2 px-4 rounded w-full"
                disabled={checking}
              >
  {checking ? 'Checking...' : isOwnSign === true ? 'It has signature' : isOwnSign === false ? 'No signature :(' : 'Check'}
              </button>
            )}

          </div>
        </div>
      );
      
};

export default VerifySigCard;
