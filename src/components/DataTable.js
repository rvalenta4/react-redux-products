import React, { Component } from 'react'
import { connect } from 'react-redux'
import './DataTable.css'
import { getProducts, deleteProduct } from '../redux/actions'
import { Link } from 'react-router-dom'
import Moment from 'moment'

class UserList extends Component {

    componentDidMount() {
        this.props.getProducts()
    }

    render() {

        const keys = this.props.products ? Object.keys(this.props.products) : []
        const products = this.props.products ? Object.values(this.props.products) : []

        return (
            <div className="table">
                <div className="table-title">List of available Products</div>

                {!this.props.getting ?
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
                        {this.props.products ? products.map((product, id) =>
                            <div className="row-with-button" key={id}>
                                <Link to={`/product/${keys[id]}`}>
                                    <div className="row">
                                        <div className="row-column">{product.name}</div>
                                        <div className="row-column">{product.number}</div>
                                        <div className="row-column-wide">
                                        {Moment(product.availableSince).format(`MMM Do YYYY`)}
                                        </div>
                                        <div className="row-column-wide">{product.manufacturer}</div>
                                        <div className="row-column">{product.origin}</div>
                                        <div className="row-column-wide">{`${product.pricingFrom} - ${product.pricingTo}`}</div>
                                        <div className="row-column">{product.quantity}</div>
                                    </div>
                                </Link>
                                <button className="btn delete-btn" onClick={() => this.props.deleteProduct(keys[id])}>Delete</button>
                            </div>)
                        : <div className="no-products">No Products Listed</div>}
                    </div>
                </> : null}

                <Link to="/product">
                    <button className="btn add-btn">Add New Product</button>
                </Link>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.products,
        getting: state.getting
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProducts: () => dispatch(getProducts()),
        deleteProduct: (id) => dispatch(deleteProduct(id))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(UserList)