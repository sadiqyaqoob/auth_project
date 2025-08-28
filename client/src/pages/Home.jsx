import React from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'

function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[url(/bg_img.png)] bg-cover bg-center">
      {/* Navbar always at the top */}
      <Navbar />

      {/* Centered Header */}
      <div className="flex flex-1 justify-center items-center">
        <Header />
      </div>
    </div>
  )
}

export default Home
