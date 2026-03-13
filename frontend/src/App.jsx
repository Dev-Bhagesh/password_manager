import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import Maneger from './components/Maneger'
import Passwordform from './components/Passwordform'
import List from './components/List'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className=''>
    <Navbar/>
    <Maneger/>
    <Passwordform/>
    {/* <List/> */}
    </div>
    </>
  )
}

export default App
