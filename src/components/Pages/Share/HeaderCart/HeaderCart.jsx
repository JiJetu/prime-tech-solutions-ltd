import React, { useContext } from 'react';
import { CartContext } from '../../../../provider/ContextProviderr';
import { Link } from 'react-router-dom';

const HeaderCart = () => {

    const { addedProducts, totalPriceWithDiscount } = useContext(CartContext);


    return (
        <div className='sticky top-0 z-50'>
            <h2 className='text-2xl'>Cart</h2>
            {
                addedProducts.length === 0 ? <p className='text-slate-400'>No product in the cart</p>
                    : <div className='space-y-2'>
                        {
                            addedProducts.map((addedProduct, index) => (
                                <div key={index}>
                                    <h2 className='text-blue-400'>{addedProduct.title}</h2>
                                    <p>{addedProduct.quantity}x{(parseFloat(addedProduct.price) * (1 - parseInt(addedProduct.discountPercentage) / 100)).toFixed(2)} (<span className='text-red-600'>with discount</span>)</p>
                                </div>
                            ))
                        }
                        <hr className='w-full my-4' />
                        <p>Total Price: {totalPriceWithDiscount.toFixed(2)}</p>

                        <div className='flex gap-3'>
                            {/* <button className="py-3 px-5 text-center bg-black text-white">
                                <Link to="/carts">View Carts</Link>
                            </button> */}
                            <button className="py-3 px-5 text-center bg-black text-white">
                                <Link to="/checkout">Checkout</Link>
                            </button>
                        </div>
                    </div>
            }
        </div>
    );
};

export default HeaderCart;