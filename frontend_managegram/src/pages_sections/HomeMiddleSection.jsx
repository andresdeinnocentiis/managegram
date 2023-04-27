import React from 'react'
import folderImg from '../assets/images/folder-dynamic-color.png'
import watchImg from '../assets/images/explorer-dynamic-colorx.png'
import heartImg from '../assets/images/notify-heart-dynamic-color.png'
import moneyImg from '../assets/images/money-dynamic-color.png'

export const HomeMiddleSection = () => {
  return (
    <section className='home-middle-section'>
        <div className="section-container">
            <div className="bulletpoint">
                <div className="bulletpoint__img-container">
                    <img src={folderImg} alt="bulletpoint image of a file" className='bulletpoint__img' />
                </div>
                <p className="bulletpoint__description">
                Manage all your customer, supplier, product, order, and payment information in one place, making it easier for you to keep track of your business operations.
                </p>
            </div>
            <div className="bulletpoint">
                <p className="bulletpoint__description">
                Streamline your business processes and optimize your sales with Managegram's efficient tools and features, saving you time and effort.
                </p>
                <div className="bulletpoint__img-container">
                    <img src={watchImg} alt="bulletpoint image of a watch" className='bulletpoint__img' />
                </div>
            </div>
            <div className="bulletpoint">
                <div className="bulletpoint__img-container">
                    <img src={heartImg} alt="bulletpoint image of a heart" className='bulletpoint__img' />
                </div>
                <p className="bulletpoint__description">
                Managegram's user-friendly interface is designed to be intuitive and easy to use, so you can manage your business operations without any hassle.
                </p>
            </div>
            <div className="bulletpoint">
                <p className="bulletpoint__description">
                Take control of your business operations, make informed decisions, and take the necessary actions to grow your business.
                </p>
                <div className="bulletpoint__img-container">
                    <img src={moneyImg} alt="bulletpoint image of money" className='bulletpoint__img' />
                </div>
            </div>
        </div>
    </section>
  )
}
