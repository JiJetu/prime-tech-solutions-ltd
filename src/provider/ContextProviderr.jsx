import { createContext, useState } from "react";


export const CartContext = createContext();

const ContextProviderr = ({ children }) => {
    const [addedProducts, setAddedProducts] = useState([]);

    const handleAddToCart = (productToAdd) => {
        const productExists = addedProducts.find(product => product.id === productToAdd.id);

        if (productExists) {
            if (productToAdd.stock > 0) {
                const updatedProducts = addedProducts.map(product =>
                    product.id === productToAdd.id
                        ? { ...product, quantity: product.quantity + 1, stock: product.stock - 1 }
                        : product
                );
                setAddedProducts(updatedProducts);
            } else {
                alert("No more stock available for this product.");
            }
        } else {
            if (productToAdd.stock > 0) {
                setAddedProducts([...addedProducts, { ...productToAdd, quantity: 1, stock: productToAdd.stock - 1 }]);
            } else {
                alert("This product is out of stock.");
            }
        }
    }

    const handleAddMultipleToCart = (productToAdd, quantity) => {
        const productInCart = addedProducts.find(product => product.id === productToAdd.id);

        if (productInCart) {
            const newQuantity = productInCart.quantity + quantity;
            if (newQuantity <= productToAdd.stock) {

                const updatedProducts = addedProducts.map(product =>
                    product.id === productToAdd.id ? { ...product, quantity: newQuantity } : product
                );
                setAddedProducts(updatedProducts);
            } else {
                alert("Insufficient stock available.");
            }
        } else {
            if (quantity <= productToAdd.stock) {
                setAddedProducts([...addedProducts, { ...productToAdd, quantity }]);
            } else {
                alert("Insufficient stock available.");
            }
        }
    };


    let singleProductWithDiscount = 0;

    for (const addedProduct of addedProducts) {
        const price = parseFloat(addedProduct.price);
        const discountPercentage = parseInt(addedProduct.discountPercentage);

        if (!isNaN(price) && !isNaN(discountPercentage)) {
             singleProductWithDiscount += price * (1 - discountPercentage / 100);
        } else {
            console.error('Invalid price or discount percentage:', addedProduct);
        }
    }



    const totalPriceWithDiscount = addedProducts.reduce((total, currentProduct) => {
        const discountedPrice = currentProduct.price * (1 - parseInt(currentProduct.discountPercentage) / 100);
        return total + (discountedPrice * currentProduct.quantity);
    }, 0);

    const cartInfo = {
        addedProducts,
        handleAddToCart,
        handleAddMultipleToCart,
        totalPriceWithDiscount,
        singleProductWithDiscount
    }

    return (
        <CartContext.Provider value={cartInfo}>
            {children}
        </CartContext.Provider>
    );
};

export default ContextProviderr;