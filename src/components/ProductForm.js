import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import './ProductForm.css'
import * as Yup from 'yup'
import { postProduct, getProduct, putProduct } from '../redux/actions'
import { Link } from 'react-router-dom'

const ValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(15, 'Too Long!')
        .required('Required'),
    number: Yup.number()
        .min(0, 'Cannot be negative!')
        .max(9999, 'Max of 4 digits!')
        .required('Required'),
    weight: Yup.number()
        .min(0, 'Cannot be negative!')
        .max(9999, 'Too Heavy!')
        .required('Required'),
    packaging: Yup.string()
        .required('Required'),
    availableSince: Yup.date()
        .min('2000-01-01', '21st century only!')
        .max('2099-12-32', '21st century only!')
        .required('Required'),
    manufacturer: Yup.string()
        .min(2, 'Too Short!')
        .max(15, 'Too Long!')
        .required('Required'),
    origin: Yup.string()
        .required('Required'),
    pricingFrom: Yup.number()
        .min(0, 'Cannot be negative!')
        .max(9999, 'Too expensive!')
        .required('Required'),
    pricingTo: Yup.number()
        .min(0, 'Cannot be negative!')
        .max(9999, 'Too expensive!')
        .required('Required')
        .when('pricingFrom', ((pricingFrom, schema) => {
            if(pricingFrom) return schema.min(pricingFrom, '↑to or ↓from')
            return schema
        })),
    quantity: Yup.number()
        .min(0, 'Cannot be negative!')
        .max(9999, 'Too many items!')
        .required('Required'),
})

class ProductForm extends Component {

    componentDidMount() {
        const {id} = this.props.match.params
        this.props.getProduct(id)
    }

  render() {
    const {id} = this.props.match.params
    const {product} = this.props

    const initialValues = {
        name: product && product.name ? product.name : '',
        number: product && product.number ? product.number : '',
        weight: product && product.weight ? product.weight : '',
        packaging: product && product.packaging ? product.packaging : '',
        availableSince: product && product.availableSince ? product.availableSince : '',
        manufacturer: product && product.manufacturer ? product.manufacturer : '',
        origin: product && product.origin ? product.origin : '',
        pricingFrom: product && product.pricingFrom ? product.pricingFrom : '',
        pricingTo: product && product.pricingTo ? product.pricingTo : '',
        quantity: product && product.quantity ? product.quantity : '',
    }

        return (
            <div className="form">

                <h1>{id ? 'Edit Product Info' : 'Add New Product'}</h1>

                {!this.props.getting ?
                    <Formik
                        initialValues={initialValues}
                        validationSchema={ValidationSchema}
                        onSubmit={(values, { setSubmitting }) => {

                            const {id} = this.props.match.params

                            const request = !id
                                ? this.props.postProduct(values) 
                                : this.props.putProduct(id, values)

                            request
                                .then(res => {
                                    if(res) {
                                        setSubmitting(false)
                                        this.props.history.push("/")
                                    }
                                }
                            )
                        }}
                    >
                    {({ isSubmitting }) => (
                        <Form className="formik-form">
                        
                            <h3>Basic Info</h3>

                            <div className="form-row">
                                <div>
                                    <div className="label">Name</div>
                                    <Field type="input" name="name"/>
                                    <ErrorMessage name="name" component="div" className="error"/>
                                </div>
                                
                                <div>
                                    <div className="label">Number</div>
                                    <Field type="number" name="number"/>
                                    <ErrorMessage name="number" component="div" className="error"/> 
                                </div>
                                
                                <div>
                                    <div className="label">Weight (lb)</div>
                                    <Field type="number" name="weight"/>
                                    <ErrorMessage name="weight" component="div" className="error"/>
                                </div>
                                
                                <div>
                                    <div className="label">Packaging</div>
                                    <Field component="select" name="packaging">
                                        <option value=""></option>
                                        <option value="box">box</option>
                                        <option value="crate">crate</option>
                                        <option value="bag">bag</option>
                                    </Field>
                                    <ErrorMessage name="packaging" component="div" className="error"/>
                                </div>
                                
                                <div>
                                    <div className="label">Available Since</div>
                                    <Field type="date" name="availableSince"/>
                                    <ErrorMessage name="availableSince" component="div" className="error"/>
                                </div>
                                
                            </div>
                            
                            <div >

                                <h3>More Info</h3>
                                
                                <div className="form-row">
                                    <div>
                                        <div className="label">Manufacturer</div>
                                        <Field type="input" name="manufacturer"/>
                                        <ErrorMessage name="manufacturer" component="div" className="error"/>
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
                                        <ErrorMessage name="origin" component="div" className="error"/>
                                    </div>

                                    <div>
                                        <div className="label">Pricing From ($)</div>
                                        <Field type="number" name="pricingFrom"/>
                                        <ErrorMessage name="pricingFrom" component="div" className="error"/>
                                    </div>
                                    
                                    <div>
                                        <div className="label">Pricing To ($)</div>
                                        <Field type="number" name="pricingTo"/>
                                        <ErrorMessage name="pricingTo" component="div" className="error"/>
                                    </div>

                                    <div>
                                        <div className="label">Quantity (pc.)</div>
                                        <Field type="number" name="quantity"/>
                                        <ErrorMessage name="quantity" component="div" className="error"/>
                                    </div>

                                </div>
                            </div>

                            <button className="add-btn" type="submit" disabled={isSubmitting || this.props.getting}>
                                {id ? 'Edit Prodcut' : 'Add Product'}
                            </button>

                            <Link to="/"><button className="cancel-btn">Cancel</button></Link>

                        </Form>

                    )}

                    </Formik> : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        getting: state.getting,
        product: state.product
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProduct: (id) => dispatch(getProduct(id)),
        postProduct: (values) => dispatch(postProduct(values)),
        putProduct: (id, values) => dispatch(putProduct(id, values)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm)