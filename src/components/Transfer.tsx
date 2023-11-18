import {useNFTContract} from "@/utils/getContract";
import { useState, type FC } from "react";


interface TransferNFTCardProps {
    id: string;
}

const TransferCard: FC<TransferNFTCardProps> = ({ id }) => {

    const [address, setAddress] = useState("")
    const {nft_contract} = useNFTContract();

    console.log(nft_contract)

    const handleAddresChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };

    const handleTransfer = () => {
        try{
            if(nft_contract){
            nft_contract.erc721.transfer(address,id)
            }
        } catch(e) {
            console.log("Error Transfer")
        }
       
    };

    return (
        <div className="relative bg-gray-800 text-white p-6 rounded-lg w-6/12 max-w-2xl shadow-md mt-4">
            <h1 className="text-2xl font-semibold mb-2 ">Transfer NFT</h1>

            <div>
                <label className="font-bold text-xl">Recepient</label>
                <input
                    className=" ml-2 bg-gray-800 w-20"
                    placeholder="Address"
                    type="text"
                    value={address}
                    onChange={handleAddresChange}
                />
            </div>
        { nft_contract && (
            <button
            onClick={handleTransfer}
            className="mt-4 bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Send
            </button>
        )}    
        </div>
    );
};
export default TransferCard;
