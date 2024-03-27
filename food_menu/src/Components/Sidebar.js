import React from 'react';

function Sidebar({ sideBar, cart }) {

  const cartData = [...cart.get];

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

  const totalPrice=()=>{
    let temp=0;

    cartData.forEach((data,index)=>{
      temp += data.price* data.qty
    })
    return temp;
  }

  return (
    <div id='sidebar' className='sidebar'>
      <div className='p-2'>
        {/* close button */}
        <div className='row'>
          <button className='btn btn-notFocus text-end' onClick={() => sideBar.set(!sideBar.get)}><i className='fa fa-lg fa-close'></i></button>
        </div>
        {/* side bar content */}
        <div>
          <h5 className='text-center fw-bold'>Cart items</h5>
          <div className='p-2'>
            {
              cartData?.length > 0 ? cartData?.map((item, index) => <div key={index}>
                <div className='row align-items-end'>
                  <div className='col-4 p-0 border border-secondary'>
                    <img src={item?.img} className='cart-pic' alt='cart food' />
                  </div>
                  <div className='col-1'></div>
                  <div className='col-6'>
                    <h6 className='fw-bold'>{item?.name}</h6>
                    <h6 className='text-danger'>Rs.{item?.price}</h6>
                    <input className='w-50' type='text' value={item?.qty} onChange={(e) => changeQty(e.target.value, item, index)} />
                  </div>
                  {/* total */}
                  < div className='col-10 fw-bold text-end' > Rs. {item?.price * item?.qty}</div>
                  <div className='col-2'>
                  <i role='button' className='fas fa-trash text-danger float-end' onClick={() => deleteItem(index)}></i>
                </div>
                </div>
                
                <hr/>
              </div>)
                : <div className='alert alert-danger mt-3 text-center'>Your cart is empty...</div>
            }
          </div>
        </div>
      </div >
      {/* footer */}
     {cartData.length >0 && <div className={`sidebar-footer bg-danger text-light fw-bold ${sideBar.get ? 'opened':''}`}>
          <h5 className='text-end p-2'>Total : {totalPrice()}</h5>
      </div>}
    </div >
  )
}

export default Sidebar