import React, { useEffect, useState } from 'react'
import { update } from 'immupdate'
import { useField, Field, ErrorMessage } from 'formik'
import Axios from 'axios'

const RadioInputField = (props) => {
  return (
    <label>
      <input
        name={props.name}
        type="radio"
        className="mr-2"
        value={props.cat._id}
        onClick={() => handleSelect(props.cat, props.categories, props.setcategory)}
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
    const getData = async () => {
      const res = await Axios.get('/api/categories/tree')
      setCategories(res.data.tree)
    }
    getData()
  }, [])

  return (
    <div className="flex flex-col space-y-1">
      <p className="text-blue-600"></p>
      <span>Kategori</span>
      {getSelectedList(categories, props.values.category, setCategories)
        .sort((a, b) =>
          getCatPath(a, categories) > getCatPath(b, categories) ? 1 : -1
        )
        .map((cat) => {
          return (
            <div className="mb-4">
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={() => onToggle(cat, categories, setCategories)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <Field
                  component={RadioInputField}
                  name="category"
                  {...props}
                  setcategory={setCategories}
                  cat={cat}
                  categories={categories}
                />
              </div>
              {cat.isOpen &&
                getChilds(cat).map((cat2) => {
                  return (
                    <div className="ml-4">
                      <Field
                        component={RadioInputField}
                        name="category"
                        {...props}
                        cat={cat2}
                        categories={categories}
                        setcategory={setCategories}
                      />
                      {JSON.stringify(getCatPath(cat2, categories))}
                      {cat2.isOpen &&
                        getChilds(cat2).map((cat3) => {
                          return (
                            <div className="ml-4">
                              <Field
                                component={RadioInputField}
                                name="category"
                                {...props}
                                cat={cat3}
                                categories={categories}
                                setcategory={setCategories}
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
// UPDATE IS OPEN WHEN A CAT SELECTED for not to close after selecting another cat
const handleSelect = (cat, categories, setCategories) => {
  const findCat = categories.find((c) => c._id === cat._id)
  // CAT SUB İSE VE BULUNAMAMIS SA
  if (!findCat) {
    categories.find((c) => {
      let newChildren = getChilds(c).map((sc) =>
        sc._id !== cat._id ? sc : { ...sc, isOpen: true }
      )
      c.children = newChildren.length > 0 ? newChildren : null
      const newCats = categories.map((cats) => (cats._id === c._id ? c : cats))
      return setCategories(newCats)
    })
  }
  // CAT SUB DEGIL VE BULUNMUSTUR
  if (findCat) {
    const newCats = categories.map((cat) =>
      cat._id !== findCat._id ? cat : { ...cat, isOpen: true }
    )
    return setCategories(newCats)
  }

}

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
const getSelectedList = (categories, val, setCategories) => {
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

// TOGGLE + SIGN OPEN AND CLOSE SUB CATS
const onToggle = (cat, categories, setCategories) => {
  const findCat = categories.find((c) => c._id === cat._id)
  if (!findCat) {
    categories.find((c) => {
      let newChildren = getChilds(c).map((sc) =>
        sc._id !== cat._id ? sc : { ...sc, isOpen: !sc.isOpen }
      )
      c.children = newChildren.length > 0 ? newChildren : null
      const newCats = categories.map((cats) => (cats._id === c._id ? c : cats))
      return setCategories(newCats)
    })
  }
  if (findCat) {
    const newCats = categories.map((cat) =>
      cat._id !== findCat._id ? cat : { ...cat, isOpen: !cat.isOpen }
    )
    return setCategories(newCats)
  }
}
