import Layout from '../components/Layout'
import axios from 'axios'

const Index = (props) => {
  return (
    <Layout>
      <div className="h-full bg-gray-900 flex items-start pt-12 flex-col">
        <h1 className="text-6xl sm:text-7xl lg:text-9xl  px-8 text-white font-bold mx-auto max-w-5xl">
          <span className="text-transparent bg-gradient-to-r bg-clip-text from-blue-500 to-green-500">
            Bir sonraki aşamaya
          </span>
          <br />
          geçiyoruz....
        </h1>
        <div className="my-8 p-2 mx-auto w-full border border-gray-800 hover:border-gray-700">
          {props.data.success ? (
            <p className="text-green-600 text-center"># API Status [ {props.data.message} ]</p>
          ) : (
            <p className="text-red-800 text-center"># Api Status [ FAIL ]</p>
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
