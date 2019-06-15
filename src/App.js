import React from 'react'
import './App.css'
import './components/DataTable'
import DataTable from './components/DataTable'
import ProductForm from './components/ProductForm'
import { Route, BrowserRouter as Router } from 'react-router-dom'

const App = () => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={DataTable} />
                <Route exact path="/product/:id" component={ProductForm}/>
                <Route exact path="/product" component={ProductForm} />
            </div>
        </Router>
    )
}

export default App;
