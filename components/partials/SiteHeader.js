import React from 'react'
import SiteNav from './SiteNav'
import PropTypes from 'prop-types'

const SiteHeader = ({site, post, setRef}) => {
  return (
    <div className="outer site-nav-main">
      <div className="inner">
        <SiteNav {...{site, post, setRef}} />
      </div>
    </div>
  )
}

SiteHeader.propTypes = {
  site: PropTypes.object.isRequired,
  post: PropTypes.object,
  setRef: PropTypes.func
}

SiteHeader.defaultProp = {
  setRef: null,
  post: false
}

export default SiteHeader
