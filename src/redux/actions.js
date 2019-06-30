import axios from 'axios'
import {
  GET_PRODUCTS_STARTED, GET_PRODUCTS_SUCCEEDED, GET_PRODUCTS_FAILED, 
  POST_PRODUCT_STARTED, POST_PRODUCT_SUCCEEDED, POST_PRODUCT_FAILED, 
  DELETE_PRODUCT_STARTED, DELETE_PRODUCT_SUCCEEDED, DELETE_PRODUCT_FAILED,
  GET_PRODUCT_STARTED, GET_PRODUCT_SUCCEEDED, GET_PRODUCT_FAILED,
  PUT_PRODUCT_STARTED, PUT_PRODUCT_SUCCEEDED, PUT_PRODUCT_FAILED
} from './constants'

const baseUrl = 'https://react-redux-app-89545.firebaseio.com/products'

export const getProductsStarted = () => ({type: GET_PRODUCTS_STARTED})
export const getProductsSucceeded = result => ({type: GET_PRODUCTS_SUCCEEDED, products: result})
export const getProductsFailed = error => ({type: GET_PRODUCTS_FAILED, error: error})

export const getProducts = () => (
  async dispatch => {
    dispatch(getProductsStarted())
    try {
      const response = await axios.get(`${baseUrl}.json`)
      dispatch(getProductsSucceeded(response.data))
    } catch(error) {dispatch(getProductsFailed(error))}
  }
)

export const postProductStarted = () => ({type: POST_PRODUCT_STARTED})
export const postProductSucceeded = (id, product) => ({type: POST_PRODUCT_SUCCEEDED, id: id, product: product})
export const postProductFailed = error => ({type: POST_PRODUCT_FAILED, error: error})

export const postProduct = product => (
  async dispatch => {
    dispatch(postProductStarted())
    try {
      const response = await axios.post(`${baseUrl}.json`, product)
      const id = response.data.name
      dispatch(postProductSucceeded(id, product))
    } catch(error) {dispatch(postProductFailed(error))}
  }
)

export const deleteProductStarted = () => ({type: DELETE_PRODUCT_STARTED})
export const deleteProductSucceeded = id => ({type: DELETE_PRODUCT_SUCCEEDED, deleted: id})
export const deleteProductFailed = error => ({type: DELETE_PRODUCT_FAILED, error: error})

export const deleteProduct = id => (
  async dispatch => {
    dispatch(deleteProductStarted())
    try {
      await axios.delete(`${baseUrl}/${id}.json`)
      dispatch(deleteProductSucceeded(id))
    } catch(error) {dispatch(deleteProductFailed(error))}
  }
)

export const getProductStarted = () => ({type: GET_PRODUCT_STARTED})
export const getProductSucceeded = result => ({type: GET_PRODUCT_SUCCEEDED, product: result})
export const getProductFailed = error => ({type: GET_PRODUCT_FAILED, error: error})

export const getProduct = id => (
  async dispatch => {
    dispatch(getProductStarted())
    try {
      const response = await axios.get(`${baseUrl}/${id}.json`)
      dispatch(getProductSucceeded(response.data))
    } catch(error) {dispatch(getProductFailed(error))}
  }
)

export const putProductStarted = () => ({type: PUT_PRODUCT_STARTED})
export const putProductSucceeded = (id, product) => ({type: PUT_PRODUCT_SUCCEEDED, id: id, product: product})
export const putProductFailed = error => ({type: PUT_PRODUCT_FAILED, error: error})

export const putProduct = (id, product) => (
  async dispatch => {
    dispatch(putProductStarted())
    try {
      await axios.put(`${baseUrl}/${id}.json`, product)
      dispatch(putProductSucceeded(id, product))
    } catch(error) {dispatch(putProductFailed(error))}
  }
)