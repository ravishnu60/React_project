import React from 'react';

function Sidebar({ sideBar, cart }) {

  const cartData = cart.get;

  const changeQty = (value, item, index) => {
    let temp = Number(value);
    let cartlist = [...cartData];
    let val = { ...cartlist[index], qty: '' }
    if (temp) {
      val = { ...cartlist[index], qty: temp }
      cartlist.splice(index, 1, val)
    } else if (value === '') {
      cartlist.splice(index, 1, val)
    } else {
      alert('Enter numbers');
    }
    cart.set(cartlist);
  }

  const deleteItem = (index) => {
    let temp = [...cartData]
    temp.splice(index, 1)
    cart.set(temp)
  }
  return (
    <div className='sidebar'>
      {/* close button */}
      <button className='stay-right btn btn-notFocus' onClick={() => sideBar.set(!sideBar.get)}><i className='fa fa-lg fa-close'></i></button>
      {/* side bar content */}
      <div className='p-2'>
        <h5 className='text-center fw-bold'>Cart items</h5>
        <div className=''>
          {
            cartData?.length > 0 ? cartData?.map((item, index) => <div key={index} className='row align-items-end '>
              <div className='col-6 p-0 overflow-hidden border border-secondary mb-3'>
                <img src={item?.img} className='cart-pic' alt='cart food' />
              </div>
              <div className='col-1 mb-3'></div>
              <div className='col-4 mb-3 text-center'>
                <h6 className='fw-bold'>{item?.name}</h6>
                <h6 className='text-danger'>Rs.{item?.price}</h6>
                <input className='w-50' type='text' value={item?.qty} onChange={(e) => changeQty(e.target.value, item, index)} />
              </div>
              {/* total */}
              <div className='col-6 fw-bold text-end small p-0'>Total</div>
              <div className='col-4 text-end'>
                <span className='fw-bold me-2 small'>Rs. {item?.price * item?.qty}</span>
              </div>
              <div className='col-2 text-end'>
                <i role='button' className='fas fa-trash text-danger' onClick={() => deleteItem(index)}></i>
              </div>
              <hr className='mt-2' />
            </div>)
              : <div className='alert alert-danger mt-3 text-center'>Your cart is empty...</div>
          }
        </div>
      </div>
    </div>
  )
}

export default Sidebar