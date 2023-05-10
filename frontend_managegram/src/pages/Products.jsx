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
    const [modalOpen, setModalOpen] = useState(false)
    const [filters, setFilters] = useState({supplier_name:[], brand_name:[], category_name:[]})
    const [filterName, setFilterName] = useState("")


    const dispatch = useDispatch()
    
    const handleOpenModal = () => {
        setModalOpen(currentModal => !currentModal)
    }

    const handleChange = (e) => {
        const newVal = e.target.value
        setInputText(newVal)

        const filter = products.filter(product => product.name.toLowerCase().includes(newVal.toLowerCase()))
        setShowProducts(filter)
    }
    
    const orderProductsByPrice = (order) => {
        if (order == 'up') {
            const sorted = showProducts.length ? showProducts.slice().sort((a, b) => a.price - b.price) : products.slice().sort((a, b) => a.price - b.price);
            setShowProducts(sorted)
        } else {
            const sorted = showProducts.length ? showProducts.slice().sort((a, b) => a.price - b.price) : products.slice().sort((a, b) => a.price - b.price);
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

    const handleFilterCheck = (e, filterCategory) => {

        const value = e.target.value

        setFilters((prevFilter) => ({
            ...prevFilter,
            [filterCategory]: prevFilter[filterCategory].includes(value)
              ? prevFilter[filterCategory].filter((element) => element !== value)
              : [...prevFilter[filterCategory], value],
        }));

        setFilterName(filterCategory)
    }

    const updateShowProducts = () => {
        let filtered = [...showProducts]
        if (
            filters.supplier_name.length > 0 ||
            filters.brand_name.length > 0 ||
            filters.category_name.length > 0
        ) {
            if(filterName === 'supplier_name' || !showProducts.lenght) {
                filtered = products.filter(product => filters[filterName].some(filterItem =>
                    filterItem === product[filterName]))
            } else {
                filtered = showProducts.filter(product => filters[filterName].some(filterItem =>
                    filterItem === product[filterName]))
            }
            
            setShowProducts(filtered);
        } else {
            setShowProducts([]);
        }
    }

    useEffect(() => {
        dispatch(getUserProducts())

        updateShowProducts()
        console.log(filters);
        console.log(showProducts);
    }, [filters])

    return (
        <div className='products-screen-container'>
            <div className="filter-add-container">
                <div className='filter-bar-container'>
                    <input className='search-input' type="text" onChange={handleChange} value={inputText} placeholder='Search products...' />
                </div>
                <div className="btn-search-line filter-btn" type="button" onClick={handleOpenModal}><i className="fa-solid fa-filter"></i></div>
                <div className="btn-search-line add-btn" type="button"><i className="fa-solid fa-plus"></i></div>
            </div>
            {modalOpen && 
                <div className="modal-container">
                    <h3>Filter by</h3>
                    <div className='filter-modal-container'>
                        <div className="filter">
                            <h3>Supplier</h3>
                            <div className="checkbox-container">
                                {
                                    !products ?
                                        
                                        [...new Set(showProducts.map(product => product.supplier_name))].map(supplierName => (
                                            <label key={supplierName} htmlFor={supplierName}>
                                                <input type='checkbox' id={supplierName} value={supplierName} name={supplierName} checked={filters.supplier_name.includes(supplierName)} onChange={(e) => handleFilterCheck(e, 'supplier_name')} />
                                                {supplierName}
                                            </label>
                                        ))
                                    :
                                        [...new Set(products.map(product => product.supplier_name))].map(supplierName => (
                                            <label key={supplierName} htmlFor={supplierName}>
                                                <input type='checkbox' id={supplierName} value={supplierName} name={supplierName} checked={filters.supplier_name.includes(supplierName)} onChange={(e) => handleFilterCheck(e, 'supplier_name')} />
                                                {supplierName}
                                            </label>
                                        ))
                                }
                            </div>
                        </div>
                        <div className="filter">
                            <h3>Category</h3>
                            <div className="checkbox-container">
                                {
                                    !products ?
                                        
                                        [...new Set(showProducts.map(product => product.category_name))].map(categoryName => (
                                            <label key={categoryName} htmlFor={categoryName}>
                                                <input type='checkbox' id={categoryName} value={categoryName} name={categoryName} checked={filters.category_name.includes(categoryName)} onChange={(e) => handleFilterCheck(e, 'category_name')} />
                                                {categoryName}
                                            </label>
                                        ))
                                    :
                                        [...new Set(products.map(product => product.category_name))].map(categoryName => (
                                            <label key={categoryName} htmlFor={categoryName}>
                                                <input type='checkbox' id={categoryName} value={categoryName} name={categoryName} checked={filters.category_name.includes(categoryName)} onChange={(e) => handleFilterCheck(e, 'category_name')} />
                                                {categoryName}
                                            </label>
                                        ))
                                }
                            </div>
                        </div>
                        <div className="filter">
                            <h3>Brand</h3>
                            <div className="checkbox-container">
                                {
                                    !products ?
                                        
                                        [...new Set(showProducts.map(product => product.brand_name))].map(brandName => (
                                            <label key={brandName} htmlFor={brandName}>
                                                <input type='checkbox' id={brandName} value={brandName} name={brandName} checked={filters.brand_name.includes(brandName)} onChange={(e) => handleFilterCheck(e, 'brand_name')} />
                                                {brandName}
                                            </label>
                                        ))
                                    :
                                        [...new Set(products.map(product => product.brand_name))].map(brandName => (
                                            <label key={brandName} htmlFor={brandName}>
                                                <input type='checkbox' id={brandName} value={brandName} name={brandName} checked={filters.brand_name.includes(brandName)} onChange={(e) => handleFilterCheck(e, 'brand_name')} />
                                                {brandName}
                                            </label>
                                        ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
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
