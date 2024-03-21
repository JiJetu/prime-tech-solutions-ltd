import { useContext, useEffect, useState } from "react";
import UseAxios from "../../../hooks/UseAxios";
import { FaShoppingCart } from "react-icons/fa";
import Header from "../../Header/Header";
import { Link } from "react-router-dom";
import { CartContext } from "../../../provider/ContextProviderr";
import HeaderCart from "../Share/HeaderCart/HeaderCart";

const Home = () => {
    const axios = UseAxios();
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const { handleAddToCart } = useContext(CartContext);


    useEffect(() => {
        axios.get(`/products?skip=0&limit=100`)
            .then(data => {
                console.log(data.data);
                setProducts(data.data.products);
            })
    }, [axios, setProducts])


    const handleSearchChange = e => {
        setSearch(e.target.value);
    }

    return (
        <div className="md:flex gap-7">
            <div>
                <Header handleSearchChange={handleSearchChange} search={search}></Header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        products.filter(product => {
                            return search.toLowerCase() === '' ? product : product.title.toLowerCase().includes(search)
                        }).map(product => (
                            <div
                                key={product.id}
                                className="card bg-base-100 shadow-xl flex flex-col">
                                <figure className="px-10 pt-10 h-[200px]">
                                    <img src={product.thumbnail} alt="Shoes" className="rounded-xl w-full h-full" />
                                </figure>
                                <div className="text-center space-y-3 flex-grow flex flex-col">
                                    <h2 className="text-xl flex-grow">{product.title}</h2>
                                    <p className="text-red-600 text-lg font-semibold">${product.price}</p>
                                </div>
                                <div className="w-full border-y my-2 flex justify-start items-center ">

                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="flex items-center justify-center gap-2 py-3 flex-1 border-r hover:bg-slate-200"><FaShoppingCart></FaShoppingCart> Add To Cart</button>

                                    <Link className="py-3 flex-1 text-center hover:bg-slate-200" to={`/details/${product.id}`}>
                                        <button> View Details</button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="md:w-[30%]">
                <HeaderCart></HeaderCart>
            </div>
        </div>
    );
};

export default Home;