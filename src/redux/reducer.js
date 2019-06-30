import {
    GET_PRODUCTS_STARTED, GET_PRODUCTS_SUCCEEDED, GET_PRODUCTS_FAILED, 
    POST_PRODUCT_STARTED, POST_PRODUCT_SUCCEEDED, POST_PRODUCT_FAILED, 
    DELETE_PRODUCT_STARTED, DELETE_PRODUCT_SUCCEEDED, DELETE_PRODUCT_FAILED,
    GET_PRODUCT_STARTED, GET_PRODUCT_SUCCEEDED, GET_PRODUCT_FAILED,
    PUT_PRODUCT_STARTED, PUT_PRODUCT_SUCCEEDED, PUT_PRODUCT_FAILED
} from './constants'

import produce from 'immer'

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
    return produce(state, draft => {
        switch(action.type) {
            case GET_PRODUCTS_STARTED:
                draft.getting = true
                break
            case GET_PRODUCTS_SUCCEEDED:
                draft.products = action.products
                draft.getting = false
                break
            case GET_PRODUCTS_FAILED:
                draft.error = action.error
                draft.getting = false
                break
            case POST_PRODUCT_STARTED:
                draft.posting = true
                break
            case POST_PRODUCT_SUCCEEDED:
                draft.products[action.id] = action.product
                draft.posting = false
                break
            case POST_PRODUCT_FAILED:
                draft.posting = false
                draft.error = action.error
                break
            case DELETE_PRODUCT_STARTED:
                draft.deleting = true
                break
            case DELETE_PRODUCT_SUCCEEDED:
                const {[action.deleted]: deleted, ...rest} = state.products
                draft.products = rest
                draft.deleting = false
                break
            case DELETE_PRODUCT_FAILED:
                draft.deleting = false
                draft.error = action.error
                break
            case GET_PRODUCT_STARTED:
                draft.getting = true
                break
            case GET_PRODUCT_SUCCEEDED:
                draft.product = action.product
                draft.getting = false
                break
            case GET_PRODUCT_FAILED:
                draft.error = action.error
                draft.getting = false
                break
            case PUT_PRODUCT_STARTED:
                draft.putting = true
                break
            case PUT_PRODUCT_SUCCEEDED:
                draft.products[action.id] = action.product
                draft.putting = false
                break
            case PUT_PRODUCT_FAILED:
                draft.putting = false
                draft.error = action.error
                break
            default: break
        }
    })
}

export default mainReducer