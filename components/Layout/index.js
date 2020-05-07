import React from 'react'

const Layout = ({children}) => {

  return (
    <>
      <div className="site-wrapper">
        {children}
      </div>
    </>
  )
}

export default Layout
