import React from 'react';
import '../Styles/style.css';
import { Link } from 'react-router-dom';
import bg from '../Assets/404.jpeg'

function NoScreen() {
  return (
    <div className="img-size" style={{ backgroundImage: `url(${bg})` }}>
      <div className='row offset-2 col-lg-3 col-8 text-center not-found'>
        <h1 className='mt-5'>404</h1>
        <h5>Page not found</h5>
        <Link className='pt-3' to="/home">  <button className="btn text-light">Back to home </button> </Link>
      </div>
    </div>
  )
}

export default NoScreen