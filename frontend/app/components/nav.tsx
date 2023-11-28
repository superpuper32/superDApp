'use client';

import Link from "next/link";
import { ConnectKitButton } from "connectkit";
import SetTheme from "../utils/theme.util";

export default function Nav() {
  return (
    <>
      <nav className="shadow-md rounded-b-lg">
        <div className="container mx-auto p-4">
          <div className="flex justify-between">
            <div>
              <Link href="/">
                Super DApp
              </Link>
            </div>
            <SetTheme />
            <ConnectKitButton />
          </div>
        </div>
      </nav>

      <div className="container p-4"></div>
    </>
  );
}