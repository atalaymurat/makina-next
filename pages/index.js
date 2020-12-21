import Layout from '../components/Layout'
import LeadList from '../components/LeadList'

const Index = (props) => {
  return (
    <Layout>
      <h1>Welcome to Index dev.makinatr this site under development</h1>
      <p>We develop nodejs and reacta apps for web interfaces</p>
      <div className="row">
      {props.data.leads.map((lead) => (
        <LeadList ad={lead} />
      ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`https://api.makinatr.com/leads`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data },
  }
}

export default Index
