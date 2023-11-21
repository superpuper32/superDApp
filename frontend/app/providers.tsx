'use client';

import * as React from 'react';

import { sepolia } from "wagmi/chains";
import { WagmiConfig, createConfig } from 'wagmi';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';

const alchemyId = process.env.ALCHEMY_API_KEY;
const walletConnectProjectId = process.env.WALLETCONNECT_PROJECT_ID;

const chains = [sepolia];

const config = createConfig(
  getDefaultConfig({
    alchemyId,
    walletConnectProjectId: walletConnectProjectId || "default",
    chains,
    appName: "SuperDApp",
  }),
);

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    return (
        <WagmiConfig config={config}>
            <ConnectKitProvider mode="light">
                { mounted && children }
            </ConnectKitProvider>
        </WagmiConfig>
    )
}
