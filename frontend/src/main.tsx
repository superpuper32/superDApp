import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { QueryClientProvider } from '@tanstack/react-query'

import App from './App.tsx'
import { wagmiConfig, queryClientConfig } from './configs'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClientConfig}>
          <App />
      </QueryClientProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
