import React from 'react'
import stocksImg from '../assets/images/stocksPNG3.png'

export const HomeMainSection = () => {
  return (
    <main className='hero-section'>
        <div className="hero-text-container">
            <h1 className="hero-title">Effortlessly Manage Your Business</h1>
            <p className="hero-description">Easily manage your business relationships with our web app. Keep track of clients, suppliers, products, orders, and payments in one place. Take control of your business's financial health with a clear view of all activities. Get started today!</p>
            <a className="cta-btn" href="#">
                <p>Get Started Today</p>
            </a>
        </div>
        {/*<div className="hero-img-container">
            <img src={stocksImg} className="hero-img" alt="" />
        </div> */}
    </main>
  )
}
