import Layout from '../components/Layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

const Index = (props) => {
  const Router = useRouter()
  const { t } = useTranslation()

  return (
    <Layout title="index:title">
      <div className="relative flex flex-col items-start w-full pt-12">
        <h1 className="w-full h-full max-w-5xl px-8 mx-auto text-5xl font-bold md:text-7xl lg:text-6xl ">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-green-600">
            {t('index:greeting')}
          </span>
        </h1>
        <Link href="/requests/new">
          <button type="button" className="btn-submit max-w-xs mx-auto my-10">
            {t('index:requestMachine')}
          </button>
        </Link>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const res2 = await axios.get('/api/index')
  const data2 = res2.data

  if (!data2) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data: { ...data2 } },
  }
}

export default Index
