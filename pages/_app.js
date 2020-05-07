import App from 'next/app'
import React from 'react'
import Layout from '../components/Layout'
import '../components/css/screen.css'

class MyApp extends App {

  render() {
    const {Component, pageProps} = this.props;
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }
}

export default MyApp
