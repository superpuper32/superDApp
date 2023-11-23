import Explorer from './components/explorer'
import Nav from './components/nav'
// import Button from './components/button'

export default function Page() {
  return (
    <div className="h-screen w-screen bg-white">
      <Nav />

      <Explorer/>
    </div>
  )
}