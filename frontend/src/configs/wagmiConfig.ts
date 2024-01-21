import { createConfig } from 'wagmi'
import { sepolia, polygonMumbai } from 'wagmi/chains'
import { getDefaultConfig } from 'connectkit'

const walletConnectProjectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID
const alchemyId = import.meta.env.VITE_ALCHEMY_API_KEY

const chains = [sepolia, polygonMumbai]

export const wagmiConfig = createConfig(
  getDefaultConfig({
    appName: 'SuperDApp',
    alchemyId,
    chains,
    walletConnectProjectId: walletConnectProjectId || "default",
  })
);