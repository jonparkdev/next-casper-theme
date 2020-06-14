import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

const HeaderBackground = ({ background, children }) => {
  // adding string to make featuer image responseive
  let srcset
  if(background) {
    // Flag to check if image is ghost default image
    if(!background.includes("static.ghost.org")){
      const sizes = [300, 600, 1000, 2000];
      srcset = sizes.map(size => `${background.replace('images', `images/size/w${size}`)}`);
    }
  }
  return(
    <>
      <div
        className=
          {`outer site-header-background ${background ? `responsive-header-img` : `no-image`}`}
      >
        {children}
      </div>
      <style jsx>
        {`
          .responsive-header-img {
              background-image: url(${background});
          }

          @media(max-width: 1000px) {
              .responsive-header-img {
                  background-image: url(${!isEmpty(srcset) ? srcset[2] : background});
                  background-image: image-set(url(${!isEmpty(srcset) ? srcset[2] : background}) 1x,
                      url(${!isEmpty(srcset) ? srcset[3] : background}) 2x);
              }
          }

          @media(max-width: 600px) {
              .responsive-header-img {
                  background-image: url(${!isEmpty(srcset) ? srcset[1] : background});
                  background-image: image-set(${!isEmpty(srcset) ? srcset[1] : background}) 1x,
                      url(${!isEmpty(srcset) ? srcset[2] : background}) 2x);
              }
          }
        `}
      </style>
    </>
  )
}

HeaderBackground.propTypes = {
    background: PropTypes.string
}

HeaderBackground.defaultProps = {
    background: null
}

export default HeaderBackground
