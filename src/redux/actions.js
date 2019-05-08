import axios from 'axios'
import {GET_PRODUCTS_STARTED, 
  GET_PRODUCTS_SUCCEEDED, GET_PRODUCTS_FAILED, 
  POST_PRODUCT_STARTED, POST_PRODUCT_SUCCEEDED, 
  POST_PRODUCT_FAILED, DELETE_PRODUCT_STARTED,
  DELETE_PRODUCT_SUCCEEDED, DELETE_PRODUCT_FAILED,
  GET_PRODUCT_STARTED, GET_PRODUCT_SUCCEEDED, GET_PRODUCT_FAILED,
  PUT_PRODUCT_STARTED, PUT_PRODUCT_SUCCEEDED, PUT_PRODUCT_FAILED} from './constants'

export const getProducts = () => {
    return async dispatch => {
      dispatch(getProductsStarted());
      try {
        const response = await axios.get(`https://react-redux-app-89545.firebaseio.com/products.json/`)
        dispatch(getProductsSucceeded(response.data))
      }
      catch (error) {
        dispatch(getProductsFailed(error))
      }
    };
};

export const getProductsStarted = () => {
    return { type: GET_PRODUCTS_STARTED }
}

export const getProductsSucceeded = (response) => {
    return { type: GET_PRODUCTS_SUCCEEDED, payload: response}
}

export const getProductsFailed = (error) => {
    return { type: GET_PRODUCTS_FAILED, payload: error }
}

export const postProductStarted = () => {
  return { type: POST_PRODUCT_STARTED }
}

export const postProductSucceeded = (response) => {
  return { type: POST_PRODUCT_SUCCEEDED, payload: response }
}

export const postProductFailed = (error) => {
  return { type: POST_PRODUCT_FAILED, payload: error }
}

export const postProduct = (product) => {
  return async dispatch => {
    dispatch(postProductStarted())
    try {
      await axios.post(`https://react-redux-app-89545.firebaseio.com/products.json`, product)
      dispatch(postProductSucceeded())
      return true
    }
    catch (error) {
      dispatch(postProductFailed(error))
      return false
    }
  }
}

export const deleteProduct = (id) => {
  return async dispatch => {
    dispatch(deleteProductStarted())
    try {
      await axios.delete(`https://react-redux-app-89545.firebaseio.com/products/${id}.json`)
      dispatch(deleteProductSucceeded())
      dispatch(getProducts())
    }
    catch (error) {
      dispatch(deleteProductFailed(error))
    }
  }
}

export const deleteProductStarted = () => {
  return { type: DELETE_PRODUCT_STARTED }
}

export const deleteProductSucceeded = (response) => {
  return { type: DELETE_PRODUCT_SUCCEEDED, payload: response }
}

export const deleteProductFailed = (error) => {
  return { type: DELETE_PRODUCT_FAILED, payload: error }
}

export const getProduct = (id) => {
  return async dispatch => {
    dispatch(getProductStarted())
    try {
      const response = await axios
        .get(`https://react-redux-app-89545.firebaseio.com/products/${id}.json`)
      dispatch(getProductSucceeded(response.data))
    }
    catch (error) {
      dispatch(getProductFailed(error));
    }
  }
}

export const getProductStarted = () => {
  return { type: GET_PRODUCT_STARTED }
}

export const getProductSucceeded = (response) => {
  return { type: GET_PRODUCT_SUCCEEDED, payload: response }
}

export const getProductFailed = (error) => {
  return { type: GET_PRODUCT_FAILED, payload: error }
}

export const putProductStarted = () => {
  return { type: PUT_PRODUCT_STARTED }
}

export const putProductSucceeded = (response) => {
  return { type: PUT_PRODUCT_SUCCEEDED, payload: response }
}

export const putProductFailed = (error) => {
  return { type: PUT_PRODUCT_FAILED, payload: error }
}

export const putProduct = (id, values) => {
  return async dispatch => {
    dispatch(putProductStarted());
    try {
      await axios.put(`https://react-redux-app-89545.firebaseio.com/products/${id}.json`, values)
      dispatch(putProductSucceeded())
      return true
    }
    catch (error) {
      dispatch(putProductFailed(error))
      return false
    }
  }
}