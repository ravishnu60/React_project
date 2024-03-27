import React from 'react';

function Sidebar({sideBar, cart}) {

  const cartData= cart.get;

  const changeQty=(value,item, index)=>{
    let temp= Number(value);
    let cartlist= [...cartData];
    let val= {...cartlist[index], qty:''}
    if (temp){
      val= {...cartlist[index], qty:temp}
      cartlist.splice(index,1,val)
    }else if (value===''){
      cartlist.splice(index,1,val)
    }else{
        alert('Enter numbers');
    }
    cart.set(cartlist);
}

const deleteItem=(index)=>{
  let temp= [...cartData]
  temp.splice(index,1)
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
            cartData?.length > 0 ? cartData?.map((item, index) => <div key={index} className='row align-items-center '>
              <div className='col-4 p-0 overflow-hidden border border-secondary'>
                <img src={item?.img} className='cart-pic' alt='cart food' />
              </div>
              <div className='col-4'>
                <h6 className='fw-bold '>{item?.name}</h6>
                <h6 className='text-danger'>Rs.{item?.price}</h6>
                <input className='w-50' type='text' value={item?.qty} onChange={(e)=>changeQty(e.target.value, item, index)} />
              </div>
              <div className='col-4 text-center'>
                <span className='fw-bold me-3'>Rs. {item?.price * item?.qty}</span>
                <i role='button' className='fas fa-trash text-danger' onClick={()=>deleteItem(index)}></i>
              </div>
              <hr className='mt-2'/>
            </div>)
            : <div className='alert alert-danger mt-3 text-center'>Your cart is empty...</div>
          }
        </div>
      </div>
    </div>
  )
}

export default Sidebar