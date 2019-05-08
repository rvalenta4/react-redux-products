import {GET_PRODUCTS_STARTED, 
    GET_PRODUCTS_SUCCEEDED, GET_PRODUCTS_FAILED, 
    POST_PRODUCT_STARTED, POST_PRODUCT_SUCCEEDED, 
    POST_PRODUCT_FAILED, DELETE_PRODUCT_STARTED,
    DELETE_PRODUCT_SUCCEEDED, DELETE_PRODUCT_FAILED,
    GET_PRODUCT_STARTED, GET_PRODUCT_SUCCEEDED, GET_PRODUCT_FAILED,
    PUT_PRODUCT_STARTED, PUT_PRODUCT_SUCCEEDED, PUT_PRODUCT_FAILED} from './constants'

const initialState = {
    products: {},
    product: {},
    getting: false,
    posting: false,
    deleting: false,
    putting: false,
    error: {}
}

const mainReducer = (state = initialState, action) => {
    console.log(action.type)
    switch (action.type) {
        case GET_PRODUCTS_STARTED:
            return {
                ...state,
                getting: true,
            }
        case GET_PRODUCTS_SUCCEEDED:
            return {
                ...state,
                products: action.payload,
                getting: false,
            }
        case GET_PRODUCTS_FAILED:
            return {
                ...state,
                error: action.payload,
                getting: false,
            }
        case POST_PRODUCT_STARTED:
            return {
                ...state,
                posting: true,
            }
        case POST_PRODUCT_SUCCEEDED:
            return {
                ...state,
                posting: false,
            }
        case POST_PRODUCT_FAILED:
            return {
                ...state,
                posting: false,
                error: action.payload
            }
        case DELETE_PRODUCT_STARTED:
            return {
                ...state,
                deleting: true,
            }
        case DELETE_PRODUCT_SUCCEEDED:
            return {
                ...state,
                deleting: false,
            }
        case DELETE_PRODUCT_FAILED:
            return {
                ...state,
                deleting: false,
                error: action.payload
            }
        case GET_PRODUCT_STARTED:
            return {
                ...state,
                getting: true,
            }
        case GET_PRODUCT_SUCCEEDED:
            return {
                ...state,
                product: action.payload,
                getting: false,
            }
        case GET_PRODUCT_FAILED:
            return {
                ...state,
                error: action.payload,
                getting: false
            }
        case PUT_PRODUCT_STARTED:
            return {
                ...state,
                putting: true,
            }
        case PUT_PRODUCT_SUCCEEDED:
            return {
                ...state,
                putting: false,
            }
        case PUT_PRODUCT_FAILED:
            return {
                ...state,
                putting: false,
                error: action.payload
            }
        default:
            return state
    }
  }

export default mainReducer