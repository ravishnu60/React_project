import React from 'react'

function CartBar({cart}) {
  return (
    <div className={`cart-menu bg-light ${cart ? 'open-menu p-2':''}`}>
        <h6 className='alert alert-danger text-center'>your cart is Empty</h6>
    </div>
  )
}

export default CartBar