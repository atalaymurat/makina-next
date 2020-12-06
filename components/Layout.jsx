import Navbar from './Navbar'
import Head from 'next/head'

const Layout = (props) => (
  <div>
    <Head>
      <title>makinaTr.com — Endüstriyel Makina ve Ekipmanlar</title>
      <meta
        name="title"
        content="makinaTr.com — Endüstriyel Makina ve Ekipmanlar"
      />
      <meta
        name="description"
        content="2.el veya yeni makina ekipman pazarlama ve satınalma servisleri, her sektör ile ilgili endüstriyel makina, ekipman, yedekparça, yazılım veya hizmetleri makinaTr.com platformuda paylaşabilir ve müşterilere ulaşabilirsiniz."
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://makinatr.com/" />
      <meta
        property="og:title"
        content="makinaTr.com — Endüstriyel Makina ve Ekipmanlar"
      />
      <meta
        property="og:description"
        content="2.el veya yeni makina ekipman pazarlama ve satınalma servisleri, her sektör ile ilgili endüstriyel makina, ekipman, yedekparça, yazılım veya hizmetleri makinaTr.com platformuda paylaşabilir ve müşterilere ulaşabilirsiniz."
      />
      <meta
        property="og:image"
        content="https://api.makinatr.com/cover_robotics.jpg"
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://makinatr.com/" />
      <meta
        property="twitter:title"
        content="makinaTr.com — Endüstriyel Makina ve Ekipmanlar"
      />
      <meta
        property="twitter:description"
        content="2.el veya yeni makina ekipman pazarlama ve satınalma servisleri, her sektör ile ilgili endüstriyel makina, ekipman, yedekparça, yazılım veya hizmetleri makinaTr.com platformuda paylaşabilir ve müşterilere ulaşabilirsiniz."
      />
      <meta
        property="twitter:image"
        content="https://api.makinatr.com/cover_robotics.jpg"
      />
    </Head>
    <Navbar />
    <div className="container">{props.children}</div>
  </div>
)

export default Layout
