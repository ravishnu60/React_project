import React from 'react';
import logo from '../Assets/logo.png';
import '../Styles/style.css';

function Header({cart, search}) {

  const showItems=(type)=>{
    if (type === 'search'){
      search.set(!search.get);
      cart.set(false);
    }else{
      cart.set(!cart.get);
      search.set(false);
    }
  }
  
  return (
    <div className='fixed-top header'>
      <nav class="navbar navbar-expand-lg navbar-dark fw-bold ">
        <div className='container-fluid'>
          <a class="navbar-brand px-2" href="#main" >
            <img src={logo} alt='logo' width={40} />
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent" >
            <ul class="navbar-nav mx-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#main">Home </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#about">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#menu">Menu</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#product">Products</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#review">Review</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#contact">Contact</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#blogs">Blogs</a>
              </li>
            </ul>
            <div>
              <i className='fa fa-search pointer' onClick={()=>showItems('search')}  />
              <i className='fas fa-cart-shopping p-3 pointer' onClick={()=>showItems('cart')} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header