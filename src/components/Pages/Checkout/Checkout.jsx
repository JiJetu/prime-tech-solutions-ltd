import { useContext, useState } from "react";
import { CartContext } from "../../../provider/ContextProviderr";
import { useDispatch, useSelector } from "react-redux";
import { updatedByAmount } from "../../../redux/features/updateCounter/CounterSlice";

const Checkout = () => {
    const { addedProducts } = useContext(CartContext)

    const [productQuantities, setProductQuantities] = useState({});

    
    const dispatch = useDispatch();
    const { quantity } = useSelector((state) => state.cartQuantity)

    const handleUpdateQuantity = id => {
        dispatch(updatedByAmount({id, updateQuantity}))
    }
    

    return (
        <div className="mt-4">
            <div className="overflow-x-auto">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    {
                        addedProducts.map((addedProduct, index) => (
                            <tbody key={addedProduct.id}>
                                <tr className="border-b-0">
                                    <td className="text-red-600 text-center">X {quantity}</td>
                                    <td className="w-[100px] h-[100px]">
                                        <img src={addedProduct.thumbnail} alt="" />
                                    </td>
                                    <td className="font-extrabold">{addedProduct.title}
                                    </td>
                                    <td>
                                        $ {(parseFloat(addedProduct.price) * (1 - parseInt(addedProduct.discountPercentage) / 100)).toFixed(2)}
                                    </td>
                                    <td>
                                        <input
                                        onChange={(e) => setProductQuantities({ ...productQuantities, [addedProduct.id]: parseInt(e.target.value) })}
                                            className="p-3 text-center border-2 w-24"
                                            name="quantity"
                                            defaultValue={addedProduct.quantity}
                                            type="number" />
                                    </td>
                                    <td>{(addedProduct.price * (1 - parseInt(addedProduct.discountPercentage) / 100) * productQuantities[addedProduct.id] || (addedProduct.price * (1 - parseInt(addedProduct.discountPercentage) / 100) * addedProduct.quantity)).toFixed(2)}</td>
                                </tr>

                                <tr className="border-b">
                                    <th></th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><button className="btn"
                                        onClick={() => handleUpdateQuantity(addedProduct.id)}>Update</button></td>
                                </tr>
                            </tbody>

                        ))
                    }
                </table>
            </div>
        </div>
    );
};

export default Checkout;