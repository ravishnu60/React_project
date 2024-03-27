import React, { useEffect, useState } from 'react'
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import Home from './Components/Home';

function Layout() {
    const [sidebar, setSidebar] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        sidebar ? document.getElementById('sidebar').classList.add('opened') : document.getElementById('sidebar').classList.remove('opened');
    }, [sidebar])

    return (
        <div>
            <Sidebar sideBar={{ get: sidebar, set: setSidebar }} cart={{ get: cart, set: setCart }} />
            <Header setSidebar={setSidebar} sidebar={sidebar} />
            <Home cart={cart} setCart={setCart} />
        </div>
    )
}

export default Layout