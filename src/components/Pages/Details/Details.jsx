import { useLoaderData } from "react-router-dom";
import HeaderCart from "../Share/HeaderCart/HeaderCart";
import { useContext } from "react";
import { CartContext } from "../../../provider/ContextProviderr";

const Details = () => {
    const products = useLoaderData();
    const {id, title, description, price, discountPercentage, rating, brand, category, thumbnail} = products

    const {handleAddMultipleToCart} = useContext(CartContext);

    const handleSubmit = e => {
        e.preventDefault();
        handleAddMultipleToCart(products, parseInt(e.target.quantity.value))
    }


    return (
        <div className="md:flex gap-7 mt-5">
            <div className="w-[70%]">
                <div className="flex gap-5">
                    <div className="relative flex-1">
                        <img className="border border-slate-200 w-full h-[350px]" src={thumbnail} alt="" />
                        <p className="absolute right-6 top-8 text-lg bg-red-600 text-white px-3 py-1 rounded-lg">{parseInt(discountPercentage)}% off</p>
                    </div>
                    <div className="space-y-3 flex-1">
                        <h1 className="text-2xl flex-grow">{title}</h1>
                        <h3 className="text-lg">Brand: {brand}</h3>
                        <h3 className="text-lg">Category: {category}</h3>
                        <h5 className="text-red-600 text-lg font-semibold">$ {price}</h5>
                        <p>Rating: {parseInt(rating)}</p>
                        <p>{description}</p>
                        <form onSubmit={handleSubmit}>
                            <input
                                className="p-3 text-center border-2 w-24"
                                name="quantity"
                                defaultValue={1}
                                type="number" />
                            <input
                                className="py-3 px-5 text-center bg-black text-white"
                                type="submit" value="Add To Cart" />
                        </form>
                    </div>
                </div>
                <div className="space-y-5 mt-8">
                    <h2 className="text-xl">Description</h2>
                    <p className="text-justify">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum harum similique nam eligendi culpa eveniet rem reiciendis sint veniam ullam architecto sunt quam totam voluptates, cum adipisci officiis ab earum.
                        Dolorum rem facilis qui voluptatibus laboriosam odio, quis ipsum obcaecati, ex amet tempora praesentium esse nemo iusto! Placeat tempore in eos laborum sunt dolorem unde, deserunt dicta, iste animi at.
                        <br />
                        Suscipit eos ratione commodi rerum? Veritatis voluptatibus repellat, eveniet nam omnis quasi veniam sapiente vero aspernatur tempora blanditiis aperiam. Recusandae natus totam, explicabo repellat iure pariatur numquam eaque laboriosam voluptatum?
                        Suscipit repellat quibusdam eaque harum nesciunt tempora, consectetur accusantium soluta sequi. At quis delectus nihil commodi voluptatibus minima facere impedit, necessitatibus assumenda voluptate adipisci nesciunt atque quaerat praesentium natus! Dolorem?
                        Sapiente nulla fugit dolores nam voluptas quod beatae fuga, culpa deleniti recusandae modi minima cum temporibus consequatur odio ut quaerat? Illo tenetur sequi non vel quos nisi voluptate provident voluptates.
                        <br />
                        Impedit alias repudiandae nobis velit nulla explicabo omnis, quos debitis, nesciunt error commodi obcaecati ullam fuga qui quasi, unde voluptatum itaque rem autem assumenda a eos adipisci. Animi, veritatis eligendi?
                        Quod sed, explicabo nesciunt hic nemo ducimus possimus aut quos doloribus numquam porro atque rerum debitis veritatis dolorem nobis eum provident optio. Dicta, corporis. Impedit facilis tempora illo eius sed.
                        <br />
                        Sequi, molestiae suscipit fugiat tempora labore reprehenderit ex veritatis maxime rerum exercitationem amet expedita, totam consectetur nostrum aut neque iste iure incidunt eius sint. Enim obcaecati similique nam aliquam odio!</p>
                </div>
            </div>
            <HeaderCart></HeaderCart>
        </div>
    );
};

export default Details;