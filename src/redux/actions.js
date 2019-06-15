import axios from 'axios'
import {
  GET_PRODUCTS_STARTED, GET_PRODUCTS_SUCCEEDED, GET_PRODUCTS_FAILED, 
  POST_PRODUCT_STARTED, POST_PRODUCT_SUCCEEDED, POST_PRODUCT_FAILED, 
  DELETE_PRODUCT_STARTED, DELETE_PRODUCT_SUCCEEDED, DELETE_PRODUCT_FAILED,
  GET_PRODUCT_STARTED, GET_PRODUCT_SUCCEEDED, GET_PRODUCT_FAILED,
  PUT_PRODUCT_STARTED, PUT_PRODUCT_SUCCEEDED, PUT_PRODUCT_FAILED
} from './constants'

const baseUrl = 'https://react-redux-app-89545.firebaseio.com/products';

export const getProductsStarted = () => {
  return { type: GET_PRODUCTS_STARTED }
}

export const getProductsSucceeded = res => {
  return { type: GET_PRODUCTS_SUCCEEDED, payload: res }
}

export const getProductsFailed = err => {
  return { type: GET_PRODUCTS_FAILED, payload: err }
}

export const getProducts = () => {
    return async dispatch => {
      dispatch(getProductsStarted());
      try {
        const response = await axios.get(`${baseUrl}.json`)
        dispatch(getProductsSucceeded(response.data))
      }
      catch (error) {
        dispatch(getProductsFailed(error.response.data))
      }
    };
};

export const postProductStarted = () => {
  return { type: POST_PRODUCT_STARTED }
}

export const postProductSucceeded = (id, product) => {
  return { type: POST_PRODUCT_SUCCEEDED, payload: {id: id, product: product}}
}

export const postProductFailed = err => {
  return { type: POST_PRODUCT_FAILED, payload: err }
}

export const postProduct = product => {
  return async dispatch => {
    dispatch(postProductStarted())
    try {
      const response = await axios.post(`${baseUrl}.json`, product)
      const id = response.data.name;
      dispatch(postProductSucceeded(id, product))
    }
    catch(error) {
      dispatch(postProductFailed(error.response.data))
    }
  }
}

export const deleteProductStarted = () => {
  return { type: DELETE_PRODUCT_STARTED }
}

export const deleteProductSucceeded = id => {
  return { type: DELETE_PRODUCT_SUCCEEDED, payload: id }
}

export const deleteProductFailed = err => {
  return { type: DELETE_PRODUCT_FAILED, payload: err }
}

export const deleteProduct = id => {
  return async dispatch => {
    dispatch(deleteProductStarted())
    try {
      await axios.delete(`${baseUrl}/${id}.json`)
      dispatch(deleteProductSucceeded(id))
    }
    catch(error) {
      dispatch(deleteProductFailed(error.response.data))
    }
  }
}

export const getProductStarted = () => {
  return { type: GET_PRODUCT_STARTED }
}

export const getProductSucceeded = res => {
  return { type: GET_PRODUCT_SUCCEEDED, payload: res }
}

export const getProductFailed = err => {
  return { type: GET_PRODUCT_FAILED, payload: err }
}

export const getProduct = id => {
  return async dispatch => {
    dispatch(getProductStarted())
    try {
      const response = await axios.get(`${baseUrl}/${id}.json`)
      dispatch(getProductSucceeded(response.data))
    }
    catch(error) {
      dispatch(getProductFailed(error.response.data));
    }
  }
}

export const putProductStarted = () => {
  return { type: PUT_PRODUCT_STARTED }
}

export const putProductSucceeded = (id, product) => {
  return { type: PUT_PRODUCT_SUCCEEDED, payload: {id: id, product: product} }
}

export const putProductFailed = err => {
  return { type: PUT_PRODUCT_FAILED, payload: err }
}

export const putProduct = (id, product) => {
  return async dispatch => {
    dispatch(putProductStarted());
    try {
      await axios.put(`${baseUrl}/${id}.json`, product)
      dispatch(putProductSucceeded(id, product))
    }
    catch(error) {
      dispatch(putProductFailed(error.response.data))
    }
  }
}