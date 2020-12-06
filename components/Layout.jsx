import Navbar from './Navbar'
import Head from 'next/head'

const Layout = (props) => (
  <div>
    <Head>
      <title>makinaTr</title>
      <link rel="stylesheet" href="https://bootswatch.com/4/simplex/bootstrap.min.css" />
    </Head>
    <Navbar />
    <div className="container">
    {props.children}
    </div>
  </div>
)

export default Layout
