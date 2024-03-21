import React, { useState } from 'react';

const DashBoardFilter = () => {
    const [filterValue, SetFilterValue] = useState('')

    const handleFilterChange = e =>{
        console.log(e.target.value);
        SetFilterValue(e.target.value)
    }

    return (
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
                    onChange={handleFilterChange}
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
                    onChange={handleFilterChange}
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
    );
};

export default DashBoardFilter;