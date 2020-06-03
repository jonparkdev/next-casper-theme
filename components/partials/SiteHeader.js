import React from 'react'
import SiteNav from './SiteNav'

const SiteHeader = ({site, post, setRef}) => {
  return (
    <div className="outer site-nav-main">
      <div className="inner">
        <SiteNav {...{site, post, setRef}} />
      </div>
    </div>
  )
}

export default SiteHeader
