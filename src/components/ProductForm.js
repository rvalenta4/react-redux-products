import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import ValidationSchema from './ValidationSchema'
import './ProductForm.scss'
import { Link } from 'react-router-dom'
import { API } from '../api'
import axios from 'axios'
import {
    POST_PRODUCT_STARTED, POST_PRODUCT_SUCCEEDED, POST_PRODUCT_FAILED,
    GET_PRODUCT_STARTED, GET_PRODUCT_SUCCEEDED, GET_PRODUCT_FAILED,
    PUT_PRODUCT_STARTED, PUT_PRODUCT_SUCCEEDED, PUT_PRODUCT_FAILED
} from '../redux/constants'

const ProductForm = props => {

    const { id } = props.match.params
    const dispatch = useDispatch()

    useEffect(() => {
        const getProduct = async id => {
            dispatch({ type: GET_PRODUCT_STARTED })
            try {
                const { data: product } = await axios.get(`${API}/${id}.json`)
                dispatch({ type: GET_PRODUCT_SUCCEEDED, product: product })
            } catch (error) { dispatch({ type: GET_PRODUCT_FAILED, error: error }) }
        }
        if (id) getProduct(id)
    }, [dispatch, id])

    const { getting, product } = useSelector(state => state)

    const {
        name, number, weight, packaging, availableSince,
        manufacturer, origin, pricingFrom, pricingTo, quantity
    } = product

    const initialValues = {
        name: id ? name : '',
        number: id ? number : '',
        weight: id ? weight : '',
        packaging: id ? packaging : '',
        availableSince: id ? availableSince : '',
        manufacturer: id ? manufacturer : '',
        origin: id ? origin : '',
        pricingFrom: id ? pricingFrom : '',
        pricingTo: id ? pricingTo : '',
        quantity: id ? quantity : '',
    }

    const postProduct = async product => {
        dispatch({ type: POST_PRODUCT_STARTED })
        try {
            const { data: { name: id } } = await axios.post(`${API}.json`, product)
            dispatch({ type: POST_PRODUCT_SUCCEEDED, id: id, product: product })
        } catch (error) { dispatch({ type: POST_PRODUCT_FAILED, error: error }) }
    }

    const putProduct = async (id, product) => {
        dispatch({ type: PUT_PRODUCT_STARTED })
        try {
            await axios.put(`${API}/${id}.json`, product)
            dispatch({ type: PUT_PRODUCT_SUCCEEDED, id: id, product: product })
        } catch (error) { dispatch({ type: PUT_PRODUCT_FAILED, error: error }) }
    }

    return (
        <div className="form">
            <h1>{id ? 'Edit Product Info' : 'Add New Product'}</h1>
            {!getting && Object.keys(product).length > 0 ?
                <Formik
                    initialValues={initialValues}
                    validationSchema={ValidationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        const request = id
                            ? putProduct(id, values)
                            : postProduct(values)

                        request
                            .then(() => {
                                setSubmitting(false)
                                props.history.push("/")
                            })
                    }}>

                    {({ isSubmitting }) => (
                        <Form className="formik-form">
                            <h3>Basic Info</h3>
                            <div className="form-row">
                                <div>
                                    <div className="label">Name</div>
                                    <Field type="input" name="name" />
                                    <ErrorMessage name="name" component="div" className="error" />
                                </div>
                                <div>
                                    <div className="label">Number</div>
                                    <Field type="number" name="number" />
                                    <ErrorMessage name="number" component="div" className="error" />
                                </div>
                                <div>
                                    <div className="label">Weight (lb)</div>
                                    <Field type="number" name="weight" />
                                    <ErrorMessage name="weight" component="div" className="error" />
                                </div>
                                <div>
                                    <div className="label">Packaging</div>
                                    <Field component="select" name="packaging">
                                        <option value=""></option>
                                        <option value="box">box</option>
                                        <option value="crate">crate</option>
                                        <option value="bag">bag</option>
                                    </Field>
                                    <ErrorMessage name="packaging" component="div" className="error" />
                                </div>
                                <div>
                                    <div className="label">Available Since</div>
                                    <Field type="date" name="availableSince" />
                                    <ErrorMessage name="availableSince" component="div" className="error" />
                                </div>
                            </div>
                            <div >
                                <h3>More Info</h3>
                                <div className="form-row">
                                    <div>
                                        <div className="label">Manufacturer</div>
                                        <Field type="input" name="manufacturer" />
                                        <ErrorMessage name="manufacturer" component="div" className="error" />
                                    </div>
                                    <div>
                                        <div className="label">Origin</div>
                                        <Field component="select" name="origin">
                                            <option value=""></option>
                                            <option value="Argentina">Agentina</option>
                                            <option value="Canada">Canada</option>
                                            <option value="Germany">Germany</option>
                                            <option value="Mexico">Mexico</option>
                                            <option value="USA">USA</option>
                                        </Field>
                                        <ErrorMessage name="origin" component="div" className="error" />
                                    </div>
                                    <div>
                                        <div className="label">Pricing From ($)</div>
                                        <Field type="number" name="pricingFrom" />
                                        <ErrorMessage name="pricingFrom" component="div" className="error" />
                                    </div>
                                    <div>
                                        <div className="label">Pricing To ($)</div>
                                        <Field type="number" name="pricingTo" />
                                        <ErrorMessage name="pricingTo" component="div" className="error" />
                                    </div>
                                    <div>
                                        <div className="label">Quantity (pc.)</div>
                                        <Field type="number" name="quantity" />
                                        <ErrorMessage name="quantity" component="div" className="error" />
                                    </div>
                                </div>
                            </div>
                            <button className="add-btn" type="submit" disabled={isSubmitting || getting}>
                                {id ? 'Edit Prodcut' : 'Add Product'}
                            </button>
                            <Link to="/"><button className="cancel-btn">Cancel</button></Link>
                        </Form>
                    )}
                </Formik> : null}
        </div>
    )
}

export default ProductForm