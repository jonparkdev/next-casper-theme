//import App from 'next/app'
import React from 'react'
import Layout from '../components/Layout'
import '../components/css/screen.css'
import '../components/css/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
