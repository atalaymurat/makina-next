import Layout from '../components/Layout'
import axios from 'axios'

const Index = (props) => {
  return (
    <Layout>
      <div className="bg-gray-900 min-h-screen flex items-start pt-12">
        <h1 className="sm:text-5xl lg:text-9xl  px-8 text-white font-bold mx-auto max-w-5xl">
          <span className="text-transparent bg-gradient-to-r bg-clip-text from-blue-500 to-green-500">
            Bir sonraki aşamaya
          </span>
          <br />
          geçiyoruz....
        </h1>
        <div className="mx-4 p-2">
          {props.data.success ? (
            <p className="text-green-600">api test [{props.data.message}]</p>
          ) : (
            <p className="text-red-600">Api Test [FAIL]</p>
          )}
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await axios.get(`/api/test`)
  const res2 = await axios.get('/api/index')
  const data = res.data
  const data2 = res2.data

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data: { ...data, ...data2 } },
  }
}

export default Index
