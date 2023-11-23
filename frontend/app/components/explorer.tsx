'use client';
import { useAccount, useBalance } from "wagmi";

const LINK_ADDRESS = '0x779877A7B0D9E8603169DdbD7836e478b4624789';

const Explorer = () => {
    const { address } = useAccount();
    const { data } = useBalance({ address });
    const linkAddress = useBalance({
        address: address,
        token: LINK_ADDRESS,
        chainId: 11155111
    });

    return (
        <div className="container w-50 mx-auto max-w-md my-8 border border-slate-300 rounded-lg shadow-md space-y-4 p-5">
            <div className="flex justify-center">
                <p className="text-2xl">$7,921 </p> USD
            </div>

            <div className="flex items-center justify-between pb-2 border-b">
                <h2 className="font-semibold text-slate-900">Tokens <i className="text-slate-500">(2)</i></h2>
                <div className="rounded-full bg-slate-100 w-5 text-center">+</div>
            </div>

            <div className="flex justify-between pb-2 border-b">
                <div className="flex flex-row">
                    <div className="rounded-full w-10 h-10 bg-indigo-400">.</div>
                    <div className="h-10 m-auto pl-2">ETH</div>
                </div>
                <div>
                    <div className="text-right">$1,386.12</div>
                    {data && <div className="text-slate-500">{Number(data.formatted).toFixed(7)} {data?.symbol}</div>}
                </div>
            </div>

            <div className="flex justify-between pb-2 border-b">
                <div className="flex flex-row">
                    <div className="rounded-full w-10 h-10 bg-blue-400">.</div>
                    <div className="h-10 m-auto pl-2">LINK</div>
                </div>
                <div>
                    <div className="text-right">$1,386.12</div>
                    {linkAddress.data && <div className="text-slate-500">{linkAddress?.data.formatted} {linkAddress.data?.symbol}</div>}
                </div>
            </div>

            <div className="flex items-center justify-between pb-2 border-b">
                <h2 className="font-semibold text-slate-900">Credentials <i className="text-slate-500">(0)</i></h2>
                <div className="rounded-full bg-slate-100 w-5 text-center">+</div>
            </div>

            <div className="flex items-center justify-between pb-2 border-b">
                <h2 className="font-semibold text-slate-900">NFTs <i className="text-slate-500">(0)</i></h2>
                <div className="rounded-full bg-slate-100 w-5 text-center">+</div>
            </div>
        </div>
    )
}

export default Explorer