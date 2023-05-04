import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProducts } from '../redux/actions/productActions'

export const Products = () => {

    const [inputText, setInputText] = useState('')
    const { products } = useSelector((state) => state.products)
    const [showProducts, setShowProducts] = useState([])
    const [nameOrder, setNameOrder] = useState('down')
    const [priceOrder, setPriceOrder] = useState('down')
    const [supplierOrder, setSupplierOrder] = useState('down')
    const [brandOrder, setBrandOrder] = useState('down')
    const [categoryOrder, setCategoryOrder] = useState('down')


    const dispatch = useDispatch()

    const handleChange = (e) => {
        const newVal = e.target.value
        setInputText(newVal)

        const filter = products.filter(product => product.name.toLowerCase().includes(newVal.toLowerCase()))
        setShowProducts(filter)
    }

    const orderProductsByPrice = (order) => {
        if (order == 'up') {
            const sorted = products.slice().sort((a, b) => a.price - b.price);
            setShowProducts(sorted)
        } else {
            const sorted = products.slice().sort((a, b) => b.price - a.price);
            setShowProducts(sorted)
        }
    }

    const orderProductsByCriteria = (order, criteria) => {
        if (order == 'up') {
            const sorted = showProducts.length ? showProducts.sort((a, b) => a[criteria].localeCompare(b[criteria])) : products.sort((a, b) => a[criteria].localeCompare(b[criteria]));
            setShowProducts(sorted)
        } else {
            const sorted = showProducts.length ? showProducts.sort((a, b) => b[criteria].localeCompare(a[criteria])) : products.sort((a, b) => b[criteria].localeCompare(a[criteria]));
            setShowProducts(sorted)
        }

    }

    const handlePriceOrder = () => {
        
        if (priceOrder == 'up') {
            setPriceOrder('down')
        } else {
            setPriceOrder('up')
        }
        orderProductsByPrice(priceOrder)
    }

    const handleSupplierOrder = () => {
        
        if (supplierOrder == 'up') {
            setSupplierOrder('down')
        } else {
            setSupplierOrder('up')
        }
        orderProductsByCriteria(supplierOrder, "supplier_name")
    }

    const handleBrandOrder = () => {
        if (brandOrder == 'up') {
            setBrandOrder('down')
        } else {
            setBrandOrder('up')
        }
        orderProductsByCriteria(brandOrder, "brand_name")
    }

    const handleCategoryOrder = () => {
        if (categoryOrder == 'up') {
            setCategoryOrder('down')
        } else {
            setCategoryOrder('up')
        }
        orderProductsByCriteria(categoryOrder, "category_name")
    }

    const handleNameOrder = () => {
        if (nameOrder == 'up') {
            setNameOrder('down')
        } else {
            setNameOrder('up')
        }
        orderProductsByCriteria(nameOrder, "name")
    }

    useEffect(() => {
        dispatch(getUserProducts())

    }, [dispatch])

    return (
        <div className='products-screen-container'>
            <div className='filter-bar-container'>
                <input className='search-input' type="text" onChange={handleChange} value={inputText} placeholder='Search products...' />
            </div>
            <section className="products-section-container">
                <table className="products-container">
                    <thead className='table-head-container'>
                        <tr className='table-head-row'>
                            <th>Code</th>
                            <th>
                                Name
                                 &nbsp;
                            {nameOrder == 'up' ?
                                <i className="fa-solid fa-caret-up" onClick={handleNameOrder}></i>
                                :
                                <i className="fa-solid fa-caret-down" onClick={handleNameOrder}></i>                 
                            }
                            </th>
                            <th>Description</th>
                            <th>
                                Brand
                                 &nbsp;
                            {brandOrder == 'up' ?
                                <i className="fa-solid fa-caret-up" onClick={handleBrandOrder}></i>
                                :
                                <i className="fa-solid fa-caret-down" onClick={handleBrandOrder}></i>                 
                            }
                            </th>
                            <th>
                                Category
                                 &nbsp;
                            {categoryOrder == 'up' ?
                                <i className="fa-solid fa-caret-up" onClick={handleCategoryOrder}></i>
                                :
                                <i className="fa-solid fa-caret-down" onClick={handleCategoryOrder}></i>                 
                            }
                            </th>
                            <th className='price-col-head'>
                                Price &nbsp;
                            {priceOrder == 'up' ?
                                <i className="fa-solid fa-caret-up" onClick={handlePriceOrder}></i>
                                :
                                <i className="fa-solid fa-caret-down" onClick={handlePriceOrder}></i>                 
                            }
                            </th> 
                            <th>
                                Supplier &nbsp;
                            {supplierOrder == 'up' ?
                                <i className="fa-solid fa-caret-up" onClick={handleSupplierOrder}></i>
                                :
                                <i className="fa-solid fa-caret-down" onClick={handleSupplierOrder}></i>                 
                            }
                            </th> 
                        </tr>
                    </thead>
                    <tbody>

                    {
                        !products ? 
                        <tr className='table-row'>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        :
                        !showProducts.length ?
                        products.map((product) => {
                            return (
                                <tr className='table-row' key={product.id}>
                                    <td>{product.product_code ? product.product_code : '-' }</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.brand_name}</td>
                                    <td>{product.category_name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.supplier_name}</td>
                                </tr>
                            )
                        })
                        :
                        showProducts.map((product) => {
                            return (
                                <tr className='table-row' key={product.id}>
                                    <td>{product.product_code ? product.product_code : '-' }</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.brand_name}</td>
                                    <td>{product.category_name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.supplier_name}</td>
                                </tr>
                            )
                        })
                        
                    }                   
                    </tbody>
                </table>
            </section>
        </div>
    )
}
