import { Inter } from 'next/font/google'
import NFTCard from '@/components/NFTCard';
import { useNFTContract } from '@/utils/getContract';
import { useAddress, useOwnedNFTs } from '@thirdweb-dev/react';

export default function Home() {
  const address = useAddress();
  const {nft_contract} = useNFTContract();
  console.log(address)
  const {data:ownedNFTs, isLoading, error} = useOwnedNFTs(nft_contract, address)


  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
      <div>
                <h1 className="text-6xl font-semibold my-4 text-center">
                    My NFTs
                </h1>

                {!address && (<div>No wallet detected</div>)}
                {isLoading ? <div>Loading NFT Data...</div> : <div className='flex flex-col gap-y-5'>
                    {ownedNFTs && ownedNFTs.map((nft:any,id:any) => (
                        <NFTCard key={id} {...nft} />
                    ))}
                    </div>}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 ">
                    {/* Mapping Owned NFTS */}
                </div>
            </div>
      </div>

     
    </main>
  )
}
