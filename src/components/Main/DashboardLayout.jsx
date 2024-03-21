import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashBoardFilter from '../Pages/DashBoard/DashBoardFilter';


const DashboardLayout = () => {

    return (
        <div >
            {/* <DashBoardFilter></DashBoardFilter> */}
            <Outlet></Outlet>
        </div>
    );
};

export default DashboardLayout;