import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div className="max-w-[1240px] mx-auto">
            <Outlet></Outlet>
        </div>
    );
};

export default Main;