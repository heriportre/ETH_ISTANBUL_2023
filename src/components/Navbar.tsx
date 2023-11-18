import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ConnectWallet } from "@thirdweb-dev/react";

const Navbar = () => {
    return(
    <nav>
        <div className="flex justify-between m-10 items-center">
            <div>
                <Image 
                    src="/logo.jpg"
                    alt="Cr7 signature"
                    height="32"
                    width="100"
                />
            </div>
            <div className="flex gap-x-20">
                    <Link href="/">Homepage</Link>
                    <Link href="/forma">Messi Jersey Mint</Link>
                    <Link href="/signature">Signature Mint</Link>
                    <Link href="/checkSignature">Check Signature</Link>
            </div>
            <div>
            <ConnectWallet theme={"dark"} modalSize={"wide"} />
            </div>
            
        </div>
    </nav>
    )
}

export default Navbar

