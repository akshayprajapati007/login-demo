import Navbar from 'components/Navbar'
import React from 'react'

const Layout: React.FC<any> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default Layout
