import { Outlet } from "react-router-dom";
import LeftBar from "../../components/LeftBar/LeftBar";



const Layout = () => {
    return (
        <div className="layout">
            <div className="content">
                <Outlet />
                {/* <LeftBar /> */}
            </div>
        </div>
    );
}


export default Layout