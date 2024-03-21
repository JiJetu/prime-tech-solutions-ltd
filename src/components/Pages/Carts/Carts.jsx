import { useContext } from "react";
import { CartContext } from "../../../provider/ContextProviderr";

const Carts = () => {
    const { addedProducts, singleProductWithDiscount } = useContext(CartContext)
    console.log(singleProductWithDiscount);
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
                    <tbody>
                        {
                            addedProducts.map(addedProduct => (
                                <tr key={addedProduct.id}>
                                    <td className="text-red-600 text-center">X</td>
                                    <td className="w-[100px] h-[100px]">
                                        <img src={addedProduct.thumbnail} alt="" />
                                    </td>
                                    <td className="font-extrabold">{addedProduct.title}
                                    </td>
                                    <td>
                                        $ {(singleProductWithDiscount).toFixed(2)}
                                    </td>
                                    <td>
                                        <input
                                            className="p-3 text-center border-2 w-24"
                                            name="quantity"
                                            defaultValue={addedProduct.quantity}
                                            type="number" />
                                    </td>
                                    <td>{(addedProduct.price * (1 - parseInt(addedProduct.discountPercentage) / 100) * addedProduct.quantity).toFixed(2)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Carts;