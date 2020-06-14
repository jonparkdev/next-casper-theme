import React from 'react'
import PropTypes from 'prop-types'

const HeaderBackground = ({ background, children }) => {
  const sizes = [300, 600, 1000, 2000];
  //const srcset = sizes.map(size => `${background.replace('images', `images/size/w${size}`)} ${size}w`).join(', ');
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
          // .responsive-header-img {
          //     background-image: url(${background});
          // }
          //
          // @media(max-width: 1000px) {
          //     .responsive-header-img {
          //         background-image: url({{img_url background size='l'}});
          //         background-image: -webkit-image-set(url({{img_url background size='l'}}) 1x,
          //             url({{img_url background size='xl'}}) 2x);
          //         background-image: image-set(url({{img_url background size='l'}}) 1x,
          //             url({{img_url background size='xl'}}) 2x);
          //     }
          // }
          //
          // @media(max-width: 600px) {
          //     .responsive-header-img {
          //         background-image: url({{img_url background size='m'}});
          //         background-image: -webkit-image-set(url({{img_url background size='m'}}) 1x,
          //             url({{img_url background size='l'}}) 2x);
          //         background-image: image-set(url({{img_url background size='m'}}) 1x,
          //             url({{img_url background size='l'}}) 2x);
          //     }
          // }
        `}
      </style>
    </>
  )
}

HeaderBackground.propTypes = {
    background: PropTypes.string.isRequired
}

export default HeaderBackground
