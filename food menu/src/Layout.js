import React, { useState } from 'react'
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import Home from './Components/Home';

function Layout() {
    const [sidebar, setSidebar] = useState(false);
    const [cart, setCart] = useState([]);
    return (
        <div>
            {sidebar && <Sidebar sideBar={{get:sidebar, set:setSidebar}} cart={{get:cart, set:setCart}} />}
            <Header setSidebar={setSidebar} sidebar={sidebar} />
            <Home cart={cart} setCart={setCart} />
        </div>
    )
}

export default Layout