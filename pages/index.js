import Layout from '../components/Layout'
import axios from 'axios'
import { useRouter } from 'next/router'

const Index = (props) => {
	const Router = useRouter()

	let textNext = Router.locale === 'tr' ? "Bir sonraki aşamaya geçiyoruz" : Router.locale === 'en-US' ? "We are preparing for Next stage" : ''

  return (
    <Layout>
      <div className="flex flex-col items-start h-full pt-12 bg-gray-900">
        <h1 className="max-w-5xl px-8 mx-auto text-5xl font-bold text-white md:text-7xl lg:text-8xl">
          <span className="text-transparent bg-gradient-to-r bg-clip-text from-blue-500 to-green-500">
		{textNext}
          </span>
          
        </h1>
        <div className="w-full p-2 mx-auto my-8 border border-gray-800 hover:border-gray-700">
          {props.data.success ? (
            <p className="text-center text-green-600"># API Status [ {props.data.message} ]</p>
          ) : (
            <p className="text-center text-red-800"># Api Status [ FAIL ]</p>
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
