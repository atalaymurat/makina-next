import React from 'react'
import useSWR from 'swr'
import axios from 'axios'
import withSession from '../../lib/session'

const fetcher = async () => {
  const resCat = await axios.get('/api/categories/tree')
  const resBrands = await axios.get('/api/brands')
  const data = { cats: resCat.data.tree, brands: resBrands.data }

  return data
}

function AdminIndex() {
  const { data, error } = useSWR('admin', fetcher)
  if (error) return 'Error loading'
  if (!data) return 'Loading State'
  console.log('Data Passed to Component ::::', data)

  return (
    <div className="flex flex-col justify-center w-full h-full px-1">
      <h1 className="text-sm text-center">Panel#AdminIndex</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 text-sm">
        <div className="border border-white p-2">
          {data.cats.map((catMain) => (
            <div key={catMain._id}>
              <span className="font-bold">
                {catMain.name.tr} || {catMain.name.en}{' '}
              </span>
              {catMain.children.map((child) => (
                <div className="pl-4" key={child._id}>
                  {child.name.tr} || {child.name.en}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="border border-white p2">
          <h1 className="text-center bg-yellow-400">Edit Panel</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 border border-white p-2">
          {data.brands.map((brand) => (
            <div key={brand._id}>{brand.name}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
export const getServerSideProps = withSession(async ({ req, res }) => {
  try {
    const sessionUser = req.session.get('user')
    if (!sessionUser || sessionUser.isAdmin ) {
      res.statusCode = 401 //unauthorized
      res.redirect('/404')
      return { props: {} }
    }

    const apiRes = await axios.get(`/api/auth/user`, {
      headers: { cookie: req.headers.cookie },
    })
    console.log('PANEL API RES :: ', apiRes.data)

    const user = apiRes.data
    return {
      props: { user },
    }
  } catch (err) {
    console.error('Error: Panel.js', err)
    res.redirect('/404')
  }
})


export default AdminIndex
