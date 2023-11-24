'use client';

import Link from "next/link";
import { ConnectKitButton } from "connectkit";

export default function Nav() {
  return <nav className="shadow-md">
      <div className="container mx-auto p-4">
        <div className="flex justify-between">
          <div>
            <Link href="/">
              Super DApp
            </Link>
          </div>
          <ConnectKitButton />
        </div>
      </div>
    </nav>
}