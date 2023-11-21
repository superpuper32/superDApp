'use client';

import { ConnectKitButton } from "connectkit";

export default function Nav() {
  return <nav className="shadow-md">
      <div className="container mx-auto p-4">
        <div className="flex justify-between">
          <h1>Super DApp</h1>
          <ConnectKitButton />
        </div>
      </div>
    </nav>
}