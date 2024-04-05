import React from 'react'

function CartBar({cart}) {
  return (
    <div className={`cart-menu bg-light ${cart ? 'open-menu':''}`}>
        
    </div>
  )
}

export default CartBar