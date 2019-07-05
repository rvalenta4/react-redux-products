import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './DataTable.scss'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { API } from '../api'
import axios from 'axios'
import {
    GET_PRODUCTS_STARTED, GET_PRODUCTS_SUCCEEDED, GET_PRODUCTS_FAILED,
    DELETE_PRODUCT_STARTED, DELETE_PRODUCT_SUCCEEDED, DELETE_PRODUCT_FAILED
} from '../redux/constants'

const DataTable = () => {
    const { products, getting } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        const getProducts = async () => {
            dispatch({ type: GET_PRODUCTS_STARTED })
            try {
                const { data: products } = await axios.get(`${API}.json`)
                dispatch({ type: GET_PRODUCTS_SUCCEEDED, products: products })
            } catch (error) { dispatch({ type: GET_PRODUCTS_FAILED, error: error }) }
        }
        getProducts()
    }, [dispatch])

    const deleteProduct = async deleted => {
        dispatch({ type: DELETE_PRODUCT_STARTED })
        try {
            await axios.delete(`${API}/${deleted}.json`)
            dispatch({ type: DELETE_PRODUCT_SUCCEEDED, deleted: deleted })
        } catch (error) { dispatch({ type: DELETE_PRODUCT_FAILED, error: error }) }
    }

    return (
        <div className="table">
            <div className="table-title">List of available Products</div>
            {!getting && Object.keys(products).length > 0 ?
                <>
                    <div className="header">
                        <div className="header-column">Name</div>
                        <div className="header-column">Number</div>
                        <div className="header-column-wide">Available Since</div>
                        <div className="header-column-wide">Manufacturer</div>
                        <div className="header-column">Origin</div>
                        <div className="header-column-wide">Pricing ($)</div>
                        <div className="header-column">Quantity (pc.)</div>
                    </div>
                    <div className="rows">
                        {products ? Object.values(products).map((product, id) =>
                            <div className="row-with-button" key={id}>
                                <Link to={`/product/${Object.keys(products)[id]}`}>
                                    <div className="row">
                                        <div className="row-column">{product.name}</div>
                                        <div className="row-column">{product.number}</div>
                                        <div className="row-column-wide">
                                            {moment(product.availableSince).format(`MMM Do YYYY`)}
                                        </div>
                                        <div className="row-column-wide">{product.manufacturer}</div>
                                        <div className="row-column">{product.origin}</div>
                                        <div className="row-column-wide">
                                            {`${product.pricingFrom} - ${product.pricingTo}`}
                                        </div>
                                        <div className="row-column">{product.quantity}</div>
                                    </div>
                                </Link>
                                <button
                                    className="btn delete-btn"
                                    onClick={() => deleteProduct(Object.keys(products)[id])}>
                                    Delete
                                </button>
                            </div>) : <div className="no-products">No Products Listed</div>}
                    </div>
                </> : null}
            <Link to="/product">
                <button className="btn add-btn">Add New Product</button>
            </Link>
        </div>
    )
}

export default DataTable