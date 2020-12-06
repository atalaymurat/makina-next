import Layout from '../components/Layout'

const Index = (props) => {
  return (
    <Layout>
      <h1>Welcome to Index at Next of makinaTr</h1>
      <p>We develop nodejs and react apps for web interfaces</p>
      {props.data.leads.map((lead) => (
        <div className="mb-1">
          <img
            src={lead.images && `https://api.makinatr.com${lead.images[0].url.thumb}`}
            alt="image"
          />
          <h1 className="h4">{lead.title}</h1>
          <p>
            {lead.modelYear} {lead.brand.name} {lead.modelType} {lead.category.name}
          </p>
          <hr />
        </div>
      ))}
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
    props: { data }
  }
}

export default Index
