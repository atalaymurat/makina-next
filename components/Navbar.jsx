import Link from 'next/link'

const Navbar = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href="/">
            <a>Giriş</a>
          </Link>
        </li>
        <li>Hakkımızda</li>
        <li>Geliştiriciler</li>
      </ul>
      <style jsx>{`
        ul {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          border: solid 1px cyan;
        }
        ul li {
          margin-right: 10px;
        }
      `}</style>
    </div>
  )
}

export default Navbar
