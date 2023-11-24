
import Link from 'next/link'

export default function Page() {
  return (
    <div className="h-screen w-screen bg-white">
      <Link href="/smart-contracts/crowd-fund">Crowd Fund</Link>
      <hr/>
      <Link href="/smart-contracts/dutch-auction">Dutch Auction</Link>
    </div>
  )
}