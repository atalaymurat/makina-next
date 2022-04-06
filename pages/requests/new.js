import React from 'react'
import Layout from '../../components/Layout'
import useTranslation from 'next-translate/useTranslation'
import withSession from '../../lib/session'
import Axios from 'axios'

import MainForm from '../../components/newRequestForm/MainForm'

const New = (props) => {
  const { t } = useTranslation()
  const { user, categories, brands } = props
  return (
    <Layout noFooter>
      <div className="container mx-auto px-4">
        <div className="text-center text-xs">{t('forms:newReqForm')}</div>
        <MainForm
          initialValues={{
            name: {
              firstName: user ? user.name.firstName : '',
              lastName: user ? user.name.lastName : '',
            },
            phone:
              user && user.phone && user.phone.mobile
                ? user.phone.mobile
                : '' || (user && user.phone && user.phone.company)
                ? user.phone.company
                : '',
            email:
              user && user.local && user.local.email ? user.local.email : '',
            company: { name: '', country: 'TR', city: '' },
            requests: [
              {
                sector: '',
                category: '',
                brand: [],
                description: '',
              },
            ],
          }}
          user={user}
          categories={categories}
          brands={brands}
        />
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSession(async ({ req, res }) => {
  try {
    const sessionUser = req.session.get('user')

    const cats = await Axios.get('/api/categories')
    const brands = await Axios.get('/api/brands')

    if (!sessionUser) {
      return { props: { categories: cats.data , brands : brands.data } }
    }
    const apiRes = await Axios.get(`/api/auth/user`, {
      headers: { cookie: req.headers.cookie },
    })

    if (sessionUser) {
      const user = apiRes.data
      return {
        props: { user, categories: cats.data , brands : brands.data },
      }
    }
  } catch (err) {
    console.error('Error: RequestNew.js', err)
    res.end()
  }
})

export default New
