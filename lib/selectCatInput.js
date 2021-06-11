import React, { useEffect, useState } from 'react'
import { update } from 'immupdate'
import { useField, Field, ErrorMessage } from 'formik'

const RadioInputField = (props) => {
  return (
    <label>
      <input
        name={props.name}
        type="radio"
        className="mr-2"
        value={props.cat._id}
        onChange={(e) => {
          props.setFieldValue('category', e.currentTarget.value)
        }}
        checked={props.values.category === props.cat._id}
        {...props}
      />
      {props.cat.name} --- {props.cat._id}
    </label>
  )
}

const SelectCatInput = (props) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    alert('Use Effect')
  setCategories(data.tree)
  }, [data])

  return (
    <div className="flex flex-col space-y-1">
      <p className="text-blue-600"></p>
      <span>Kategori</span>
      {getSelectedList(categories, props.values.category)
        .sort((a, b) =>
          getCatPath(a, categories) > getCatPath(b, categories) ? 1 : -1
        )
        .map((cat) => {
          return (
            <div className="mb-4">
              <Field
                component={RadioInputField}
                name="category"
                {...props}
                cat={cat}
                onClick={() => onToggle(cat, categories, setCategories)}
              />
              {cat.isOpen &&
                getChilds(cat).map((cat2) => {
                  return (
                    <div className="ml-4">
                      <Field
                        component={RadioInputField}
                        name="category"
                        {...props}
                        cat={cat2}
                      />
                      {JSON.stringify(getCatPath(cat2, categories))}
                      {cat2.isOpen && getChilds(cat2).map((cat3) => {
                        return (
                          <div className="ml-4">
                            <Field
                              component={RadioInputField}
                              name="category"
                              {...props}
                              cat={cat3}
                            />
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
            </div>
          )
        })}
    </div>
  )
}

export default SelectCatInput

// DIGER FONKSYONLAR

const updateChildren = (cat, value) => {
  const newChildren = cat.children.map((c) =>
    c._id === value ? update(c, { isOpen: true }) : c
  )

  const newCat = update(cat, { children: newChildren })
  const hasIsOpen = cat.children.find((f) => f._id === value)

  const subs = []
  // Sub depth 2 lerını arraye atıyoruz
  cat.children.map((sub) => {
    if (sub.children) {
      sub.children.map((sub2) => {
        subs.push(sub2)
        return sub
      })
    }
    return sub
  })
  const hasValue = subs.find((f) => f._id === value)
  const idChild = hasValue ? hasValue.path.split(',')[2] : ''
  // Eger depth2 de değer var ise depth1 açık haline getiriyoruz
  const updChildren = newCat.children.map((c) =>
    c._id === idChild ? update(c, { isOpen: true }) : c
  )
  const updCat = update(newCat, { children: updChildren })

  if (hasIsOpen || hasValue !== undefined) {
    const newCatOpen = update(updCat, { isOpen: true })
    return newCatOpen
  }
  return newCat
}

// SEÇİLMİŞ KATEGORİYI BULMAK VE İŞARETLEMEK İÇİN
const getSelectedList = (categories, val) => {
  return categories.map((cat) => {
    const newCat = cat.children ? updateChildren(cat, val) : cat
    const ifSelfSelected =
      newCat._id === val ? update(newCat, { isOpen: true }) : newCat
    return ifSelfSelected
  })
}

// IS GETTING THE PARENTS PATH ahsap/panel/yatar
const getCatPath = (cat, catList) => {
  let splitedArr = cat.path ? cat.path.split(',') : []
  let fullPath = ''
  if (!cat.path) {
    fullPath = cat.name + '/'
  } else {
    splitedArr.map((i) => {
      if (i) {
        fullPath = fullPath.concat(
          catList.find((c) => c._id === i) &&
            catList.find((c) => c._id === i).name + '/',
          cat.name
        )
      }
      return fullPath
    })
  }
  return fullPath
}

const getChilds = (cat) => {
  if (!cat.children) return []
  return cat.children
}

const onToggle = (cat, categories, setCategories) => {
  const findCat = categories.find((c) => c._id === cat._id)
  if (!findCat) {
    categories.find((c) => {
      let newChildren = getChilds(c).map((sc) =>
        sc._id !== cat._id ? sc : { ...sc, isOpen: !sc.isOpen }
      )
      c.children = newChildren.length > 0 ? newChildren : null
      const newCats = categories.map((cats) => (cats._id === c._id ? c : cats))
      return setCategories([...newCats])
    })
  }
  if (findCat) {
    const newCats = categories.map((cat) =>
      cat._id !== findCat._id ? cat : { ...cat, isOpen: !cat.isOpen }
    )
    return setCategories([...newCats])
  }
}

const data = {
  success: true,
  tree: [
    {
      parentId: null,
      _w: 0,
      _id: '5f4f7428e663528f31e0d3ac',
      name: 'ahşap',
      path: '',
      __v: 0,
      depth: 0,
      id: '5f4f7428e663528f31e0d3ac',
      children: [
        {
          parentId: '5f4f7428e663528f31e0d3ac',
          _w: 0,
          _id: '5f4f9b58c72d1b91527afb9f',
          name: 'panel ebatlama',
          path: ',5f4f7428e663528f31e0d3ac',
          __v: 0,
          depth: 1,
          id: '5f4f9b58c72d1b91527afb9f',
          children: [
            {
              parentId: '5f4f9b58c72d1b91527afb9f',
              _w: 0,
              _id: '5f52384cc442651633a2c972',
              name: 'yatar daire',
              path: ',5f4f7428e663528f31e0d3ac,5f4f9b58c72d1b91527afb9f',
              __v: 0,
              depth: 2,
              id: '5f52384cc442651633a2c972',
            },
            {
              parentId: '5f4f9b58c72d1b91527afb9f',
              _w: 0,
              _id: '5f523878c442651633a2c973',
              name: 'optimizasyonlu panel ebatlama',
              path: ',5f4f7428e663528f31e0d3ac,5f4f9b58c72d1b91527afb9f',
              __v: 0,
              depth: 2,
              id: '5f523878c442651633a2c973',
            },
            {
              parentId: '5f4f9b58c72d1b91527afb9f',
              _w: 0,
              _id: '5f52407da59aec16e8df8c34',
              name: 'dik ebatlama',
              path: ',5f4f7428e663528f31e0d3ac,5f4f9b58c72d1b91527afb9f',
              __v: 0,
              depth: 2,
              id: '5f52407da59aec16e8df8c34',
            },
          ],
        },
        {
          parentId: '5f4f7428e663528f31e0d3ac',
          _w: 0,
          _id: '5f51f09dd4ebcc0b8e22789d',
          name: 'zımpara',
          path: ',5f4f7428e663528f31e0d3ac',
          __v: 0,
          depth: 1,
          id: '5f51f09dd4ebcc0b8e22789d',
          children: [
            {
              parentId: '5f51f09dd4ebcc0b8e22789d',
              _w: 0,
              _id: '5f5237e8c442651633a2c971',
              name: 'geniş bant zımpara',
              path: ',5f4f7428e663528f31e0d3ac,5f51f09dd4ebcc0b8e22789d',
              __v: 0,
              depth: 2,
              id: '5f5237e8c442651633a2c971',
            },
          ],
        },
        {
          parentId: '5f4f7428e663528f31e0d3ac',
          _w: 0,
          _id: '5f52388dc442651633a2c974',
          name: 'boya sistemleri',
          path: ',5f4f7428e663528f31e0d3ac',
          __v: 0,
          depth: 1,
          id: '5f52388dc442651633a2c974',
        },
        {
          parentId: '5f4f7428e663528f31e0d3ac',
          _w: 0,
          _id: '5f52393470b66b16b479bbf2',
          name: 'cnc',
          path: ',5f4f7428e663528f31e0d3ac',
          __v: 0,
          depth: 1,
          id: '5f52393470b66b16b479bbf2',
          children: [
            {
              parentId: '5f52393470b66b16b479bbf2',
              _w: 0,
              _id: '5f52a8cb5fe51b206dc51744',
              name: 'düz tabla cnc',
              path: ',5f4f7428e663528f31e0d3ac,5f52393470b66b16b479bbf2',
              __v: 0,
              depth: 2,
              id: '5f52a8cb5fe51b206dc51744',
            },
          ],
        },
        {
          parentId: '5f4f7428e663528f31e0d3ac',
          _w: 0,
          _id: '5f52399f70b66b16b479bbf3',
          name: 'delik',
          path: ',5f4f7428e663528f31e0d3ac',
          __v: 0,
          depth: 1,
          id: '5f52399f70b66b16b479bbf3',
        },
        {
          parentId: '5f4f7428e663528f31e0d3ac',
          _w: 0,
          _id: '5f523aaf91485016cfa30db4',
          name: 'paketleme',
          path: ',5f4f7428e663528f31e0d3ac',
          __v: 0,
          depth: 1,
          id: '5f523aaf91485016cfa30db4',
          children: [
            {
              parentId: '5f523aaf91485016cfa30db4',
              _w: 0,
              _id: '5f523aca91485016cfa30db5',
              name: 'karton kesme',
              path: ',5f4f7428e663528f31e0d3ac,5f523aaf91485016cfa30db4',
              __v: 0,
              depth: 2,
              id: '5f523aca91485016cfa30db5',
            },
          ],
        },
        {
          parentId: '5f4f7428e663528f31e0d3ac',
          _w: 0,
          _id: '5f523af291485016cfa30db7',
          name: 'yazılım',
          path: ',5f4f7428e663528f31e0d3ac',
          __v: 0,
          depth: 1,
          id: '5f523af291485016cfa30db7',
        },

        {
          parentId: '5f4f7428e663528f31e0d3ac',
          _w: 0,
          _id: '5f537bd9b5af230900a4ed6b',
          name: 'pres',
          path: ',5f4f7428e663528f31e0d3ac',
          __v: 0,
          depth: 1,
          id: '5f537bd9b5af230900a4ed6b',
          children: [
            {
              parentId: '5f537bd9b5af230900a4ed6b',
              _w: 0,
              _id: '5f537be1b5af230900a4ed6c',
              name: 'sıcak pres',
              path: ',5f4f7428e663528f31e0d3ac,5f537bd9b5af230900a4ed6b',
              __v: 0,
              depth: 2,
              id: '5f537be1b5af230900a4ed6c',
            },
          ],
        },
      ],
    },
    {
      parentId: null,
      _w: 0,
      _id: '5f4f742be663528f31e0d3ad',
      name: 'metal',
      path: '',
      __v: 0,
      depth: 0,
      id: '5f4f742be663528f31e0d3ad',
      children: [
        {
          parentId: '5f4f742be663528f31e0d3ad',
          _w: 0,
          _id: '5f524bdaa59aec16e8df8c37',
          name: 'honlama',
          path: ',5f4f742be663528f31e0d3ad',
          __v: 0,
          depth: 1,
          id: '5f524bdaa59aec16e8df8c37',
        },
      ],
    },
  ],
}
