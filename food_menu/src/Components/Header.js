import React from 'react'
import icon from '../Assets/icon.png'

function Header({ setSidebar, sidebar }) {
    return (
        <div className='fixed-top p-2 bg-danger text-center text-light fw-bold h6'>
            <img src={icon} alt='icon' width={30} />&nbsp;&nbsp;
            {/* <i className='fas fa-bread-slice'></i> */}
             FOOD DELIGHT
            <button className='stay-right btn-notFocus btn px-3 pt-0' onClick={()=> setSidebar(!sidebar)}><i className="fas fa-cart-shopping text-light"></i></button>
        </div>
    )
}

export default Header