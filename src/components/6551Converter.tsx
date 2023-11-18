import { type FC, useState, useEffect } from "react";
import { ethers } from "ethers";
import { useSigner } from "@thirdweb-dev/react";
import {registerAbi} from "@/utils/registerAbi"; // Ensure this is the correct path to your ABI

interface TBAProps {
  id: string;
}

const Converter6551: FC<TBAProps> = ({ id }) => {
  const contractAddress = "0xC13c0a003C256ce72AFd743F13d7f11FEa938232";
  const signer = useSigner();
  const [isSending, setIsSending] = useState(false);
  const [TBAccount, setTBAccount] = useState<string | null>(null);

  const sendTransaction = async () => {
    if (!signer) throw new Error("No signer available");

    const salt = "0x4272696e67696e6720544241277320746f204368696c697a"


    const contract = new ethers.Contract(contractAddress, registerAbi, signer);

    const tx = await contract.createAccount(
      "0x0109F38B41E6Be0dD12e7450D978681E8D6A0194",
      "0x4272696e67696e6720544241277320746f204368696c697a0000000000000000", // https://www.devoven.com/encoding/bytes32-to-string?from=0x4272696e67696e6720544241277320746f204368696c697a0000000000000000
      88882,
      process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
      id,
    );

    setIsSending(true);
    await tx.wait();
    setIsSending(false);
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
            id,
        );
        setTBAccount(account || 'No account found for this NFT');
      } catch (error) {
        console.error('Error fetching account', error);
        setTBAccount('Error fetching account');
      }
    };

    getAccount();
  }, [id]);

  console.log(TBAccount)

  return (
    <div className="flex flex-col items-center gap-y-4">
        <button className="mt-6 bg-blue-700 text-white font-bold py-2 px-4 rounded text-center "
          onClick={sendTransaction}
          disabled={isSending}
        >
          {isSending ? 'Converting...' : 'Convert NFT into Wallet'}
        </button>
        <div>
        {TBAccount && (
            <p className="mb-20">Wallet for this NFT: {TBAccount}</p>
        )}
        </div>
        </div>
  );
};

export default Converter6551;
