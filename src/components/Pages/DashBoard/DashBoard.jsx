import { useContext, useEffect, useState } from "react";
import UseAxios from "../../../hooks/UseAxios";
import { CartContext } from "../../../provider/ContextProviderr";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const DashBoard = () => {
    const axios = UseAxios();
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const { handleAddToCart } = useContext(CartContext);
    const [productsPerPage, setProductsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(0);
    const [filterData, setFilterData] = useState({ 'category': '', 'brand': '' })


    const numberOfPages = Math.ceil(parseInt(count) / productsPerPage);

    const pages = [...Array(numberOfPages).keys()];


    useEffect(() => {
        axios.get('/products?skip=0&limit=100')
            .then(res => {
                setOriginalProducts(res.data.products)
                setCount(res.data.total);
            })
    }, [axios])

    // useEffect(() => {
    //     axios.get(`/products?skip=${currentPage * productsPerPage}&limit=${productsPerPage}`)
    //         .then(res => {
    //             setProducts(res.data.products);
    //             // setOriginalProducts(res.data.products)
    //             setCount(res.data.total);
    //         })
    // }, [axios, setProducts, currentPage, productsPerPage, setCount])


    const handleProductsPerPage = e => {
        const val = parseInt(e.target.value)
        console.log(val);
        setProductsPerPage(val);
        setCurrentPage(0)
    }
    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    // filtering data
    useEffect(() => {
        let filteredProducts = originalProducts;

        if(filterData.category==='' && filterData.category===''){
            setCount(originalProducts.length)
        }

        if (filterData.category) {
            filteredProducts = filteredProducts.filter(product =>
                product.category.toLowerCase() === filterData.category.toLowerCase());
        }

        if (filterData.brand) {
            filteredProducts = filteredProducts.filter(product =>
                product.brand.toLowerCase() === filterData.brand.toLowerCase());
        }

        const start = currentPage * productsPerPage;
        const paginatedProducts = filteredProducts.slice(start, start + productsPerPage);

        setProducts(paginatedProducts);
        
        // Use filteredProducts.length for pagination count only if both filters are applied
        if (filterData.category || filterData.brand) {
            setCount(filteredProducts.length);
        }

    }, [filterData, originalProducts, currentPage, productsPerPage]);

    // set product type; [ex: category: 'smartphone' || brand: 'apple']
    const handleFilterProduct = (type, e) => {
        const value = e.target.value;
        setFilterData(prev => ({
            ...prev,
            [type]: value,
        }));
    };


    return (
        <div className="container mx-auto flex justify-center my-8 gap-5">
            <div className='w-[20%] space-y-3'>
                <h2 className='text-3xl text-center p-2'>DashBoard</h2>
                <div className='space-y-2'>
                    <p>Price</p>
                    <input type="range" min={0} max="100" value="40" className="range" />
                </div>
                <div className='space-y-2'>
                    <p>Rating</p>
                    <input type="range" min={0} max="100" value="100" className="range" />
                </div>
                <div className='space-y-2'>
                    <p>Category</p>
                    <select
                        defaultValue=""
                        onChange={(event) => handleFilterProduct("category", event)}
                        className="p-3 border w-full" name="" id="">
                        <option value="">All</option>
                        <option value="smartphones">Smartphones</option>
                        <option value="laptops">Laptops</option>
                        <option value="fragrances">Fragrances</option>
                        <option value="skincare">Skincare</option>
                        <option value="groceries">Groceries</option>
                        <option value="home-decoration">Home Decoration</option>
                        <option value="furniture">Furniture</option>
                    </select>
                </div>
                <div className='space-y-2 filter '>
                    <p>Brand</p>
                    <select
                        defaultValue="default"
                        onChange={(event) => handleFilterProduct("brand", event)}
                        className="p-3 border w-full" name="" id="">
                        <option value="">All</option>
                        <option value="Apple">Apple</option>
                        <option value="Samsung">Samsung</option>
                        <option value="OPPO">OPPO</option>
                        <option value="Huawei">Huawei</option>
                        <option value="Microsoft Surface">Microsoft Surface</option>
                        <option value="Infinix">Infinix</option>
                        <option value="HP Pavilion">HP Pavilion</option>
                    </select>
                </div>
            </div>
            <div className="w-[78%]">
                {/* pagination */}
                <div className="text-center">
                    <button className="p-3 mr-3 border rounded-l-2xl" onClick={handlePreviousPage}>Prev</button>
                    {
                        pages.map(page => <button
                            onClick={() => setCurrentPage(page)}
                            className={currentPage === page ? "p-3 bg-orange-600 text-white rounded-lg mr-3" : "p-2 mr-3"}
                            key={page}>{page + 1}</button>)
                    }
                    <button className="p-3 mr-3 border rounded-r-2xl" onClick={handleNextPage}>Next</button>

                    <select value={productsPerPage} onChange={handleProductsPerPage} className="p-3" name="" id="">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        products.map(product => (
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
        </div>
    );
};

export default DashBoard;