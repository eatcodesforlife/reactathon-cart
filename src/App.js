import React from 'react'
import { useGlobalContext } from './utils/context'
import Navbar from './components/Navbar'
import CartContainer from './components/CartContainer'


function App() {
  const { isLoading } = useGlobalContext()
  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  )
}

export default App
