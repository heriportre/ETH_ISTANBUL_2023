import {Chain} from 'wagmi';

export const spicy = {
    id: 88_882,
    name: 'Spicy Chain',
    network: 'Chiliz',
    nativeCurrency: {
      decimals: 18,
      name: 'Chiliz',
      symbol: 'CHZ',
    },
    rpcUrls: {
      public: { http: ['https://spicy-rpc.chiliz.com/'] },
      default: { http: ['https://chiliz-spicy.publicnode.com'] },
    },
    blockExplorers: {
      etherscan: { name: 'SnowTrace', url: 'http://spicy-explorer.chiliz.com/' },
      default: { name: 'SnowTrace', url: 'http://spicy-explorer.chiliz.com/' },
    },
  } as const satisfies Chain