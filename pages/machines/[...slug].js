import React from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'

const Machine = () => {
  const router = useRouter()
  const { slug } = router.query
  return (
    <Layout>
      <div className="w-screen">
        <h1 className="text-center">Machine#Show</h1>
        <h2>title {JSON.stringify(slug)}</h2>
      </div>
    </Layout>
  )
}

export default Machine
