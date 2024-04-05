import React, { useState } from 'react';
import Header from './Header';
import CartBar from './CartBar';
import aboutImg from '../Assets/about-coffee.png';

function Home() {
  const [cart, setCart] = useState(false);
  const [search, setSearch] = useState(false);

  return (
    <>
      <Header cart={{ get: cart, set: setCart }} search={{get:search, set:setSearch}} />
      <CartBar cart={cart} />
      <div className={`search text-end ${search ? 'show-search' : ''}`}>
        <div class="input-group">
          <input id='search' type="text" class="form-control border-0" placeholder="search"  autoComplete='off' />
          <div class="input-group-prepend pointer">
            <span class="input-group-text bg-light border-0 clear" onClick={()=>{
              document.getElementById('search').value=null;
            }}>x</span>
          </div>
          <div class="input-group-prepend pointer">
            <span class="input-group-text border-0 rounded-right"> <i className='fa fa-search'></i></span>
          </div>
        </div>
      </div>
      <section id='main' className='d-flex align-items-center home-content tab'>
        <div className='row col-12 home-sub'>
          <div className='col-lg-6 col-md-3 col-sm-1'></div>
          <div className='col-lg-5 col-md-8 col-sm-10 mx-2'>
            <h1>FRESH COFFEE IN THE MORNING</h1>
            <p className='text-secondary'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.It has survived not only five centuries.
            </p>
            <button className='btn btn-sm'>Get in Now</button>
          </div>
        </div>
      </section>
      <section id="about" className='about-content tab'>
        <h1 className='text-center mb-5'>ABOUT <span className='text-light'>US</span></h1>
        <div className='container'>
          <div className='row p-0'>
            <div className='col-lg-6 p-0 about-img'>
              <img className='rounded' src={aboutImg} alt='About' />
            </div>
            <div className='col-lg-6'>
              <h2 className='mt-5'>What makes Our Coffee Special?</h2>
              <p className='text-secondary'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br /><br />
                When an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
              <button className='btn btn-sm'>Learn More</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home