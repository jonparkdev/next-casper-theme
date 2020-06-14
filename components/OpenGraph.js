import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

// All meta tags can be added here
// This component will need to be modified, to accommadate twitter
// and facebook meta tags
const OpenGraph = ({ title, description, image, router, type }) => (

  <Head>
    {title && (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
      </>
    )}
    {description && (
      <>
        <meta property="og:description" content={description} />
        <meta name="description" content={description} />
      </>
    )}
    {image && (
      <meta
        property="og:image"
        content={image}
      />
    )}
    <meta property="og:type" content={type} />
    <meta
      property="og:url"
      content={`${process.env.SERVER_HOSTNAME}${router.asPath}`}
    />
  </Head>
);

OpenGraph.propTypes = {
  router: PropTypes.shape({
    asPath: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

OpenGraph.defaultProps = {
  type: 'website',
};

export default OpenGraph;
