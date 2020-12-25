import withSession from '../lib/session'
import Layout from '../components/Layout'

const Panel = ({ user }) => (
  <Layout title="Panel">
    <div>
      <h1>Panel#SHOW</h1>
      <p>This page is only for registred users</p>
      <p>welcome user {user.email}</p>
      <p>user session object {JSON.stringify(user)}</p>
    </div>
  </Layout>
)

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get('user')
  if (!user) {
    res.statusCode = 401 //unauthorized
    res.end()
    return { props: {} }
  }
  return {
    props: { user },
  }
})

export default Panel
