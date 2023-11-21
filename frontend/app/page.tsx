import Button from './components/button'
import Nav from './components/nav'

export default function Page() {
  return (
    <div className="h-screen w-screen bg-white">
      <Nav />

      <div className="container h-60 w-50 mx-auto my-8 bg-slate-50 border border-slate-300 rounded shadow-lg space-y-4 p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Address Explorer</h2>
          
          <Button name="Wallet" />
        </div>
          
      </div>
    </div>
  )
}