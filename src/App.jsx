import { useMemo } from 'react'

import { ToastContainer } from 'react-toastify'

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'

import {
  LedgerWalletAdapter,
  Coin98WalletAdapter,
  // FractalWalletAdapter,
  CoinbaseWalletAdapter,
  TrustWalletAdapter,
  PhantomWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets'

import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'

import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'

import Router from './routes'

import '@solana/wallet-adapter-react-ui/styles.css'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  const Url =
    'https://bold-sleek-star.solana-mainnet.quiknode.pro/6b36d57823014834a80262b13f0ed5acc898240b/'
  const network = WalletAdapterNetwork.Mainnet
  const endpoint = useMemo(() => Url, [])

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new TrustWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new Coin98WalletAdapter(),
      // new FractalWalletAdapter(),
      new CoinbaseWalletAdapter(),
    ],
    [network]
  )
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ToastContainer />
          <Router />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
