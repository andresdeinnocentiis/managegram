import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProducts } from '../redux/actions/productActions'

export const Products = () => {

    const [inputText, setInputText] = useState('')
    const { products } = useSelector((state) => state.products)

    const dispatch = useDispatch()

    const handleChange = (e) => {
        const newVal = e.target.value
        setInputText(newVal)
    }

    useEffect(() => {
        dispatch(getUserProducts())

    }, [dispatch])

    return (
        <div className='products-screen-container'>
            <div className='filter-bar-container'>
                <input type="text" onChange={handleChange} value={inputText} placeholder='Search products...' />
            </div>
            <section className="products-section-container">
                <div className="products-container">
                    {
                        !products ? 
                        <p>You haven't added any products yet. Add products to see them here.</p>
                        :
                        products.map((product) => {
                            return (
                                <p key={product.id}>{product.name} - ${product.price}</p>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    )
}
