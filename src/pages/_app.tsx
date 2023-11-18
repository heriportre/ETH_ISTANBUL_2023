import "@/styles/globals.css";
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import { SpicyChain } from "@thirdweb-dev/chains";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Menubar from "@/components/Menubar";
import Footer from "@/components/Footer";


export default function App({ Component, pageProps }: AppProps) {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		setReady(true);
	}, []);
	return (
		<>
		{ready ? (
			<ThirdwebProvider
        	    activeChain={SpicyChain}
        	    clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
        	    supportedWallets={[metamaskWallet()]}
        	>
          	<Menubar>
					<Component {...pageProps} />
          	</Menubar>
			{<Footer />}
		  </ThirdwebProvider>
			) : null}
		</>
	);
}
