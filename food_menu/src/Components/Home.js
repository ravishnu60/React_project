import React, { useState } from 'react';
import food1 from '../Assets/food/food1.jpg';
import food2 from '../Assets/food/food2.jpg';
import food3 from '../Assets/food/food3.jpg';
// import cake1 from '../Assets/food/cake1.jpg';
import nonFood1 from '../Assets/food/nonfood1.jpg';
import nonFood2 from '../Assets/food/nonfood2.png';
import '../Style/style.css';

function Home({ cart, setCart }) {
    const [qty, setQty] = useState({});
    const [click, setClick] = useState({});

    const food = {
        veg: [
            { id: 1, name: 'plain dosa', img: food1, price: 20 },
            { id: 2, name: 'Idly', img: food2, price: 15 },
            { id: 3, name: 'Meals', img: food3, price: 75 }
        ],
        non_veg: [

            { id: 4, name: 'Chicken biriyani', img: nonFood1, price: 120 },
            { id: 5, name: 'Chicken rice', img: nonFood2, price: 90 }
        ],
        // cake: [

        //     { id: 6, name: 'Dark cake', img: cake1, price: 25 }
        // ]
    };

    const changeQty = (value, id) => {
        let temp = Number(value);
        if (temp) {
            setQty(pre => ({ ...pre, [id]: temp }));
        } else if (value === '') {
            setQty(pre => ({ ...pre, [id]: '' }));
        } else {
            alert('Enter numbers');
        }
    }
    const addToCart = (item) => {
        let temp = { ...item, qty: qty[item.id] ? qty[item.id] : 1 };
        let cartlist = [...cart];
        let index = cartlist.findIndex(cartItem => Number(cartItem.id) === Number(item.id));
        if (index !== -1) {
            cartlist[index].qty += qty[item.id] ? Number(qty[item.id]) : 1;
        } else {
            cartlist.push(temp);
        }
        setClick({ [item.id]: false });
        setCart(cartlist);
        setQty({});
    }

    return (
        <div className='mt-5'>
            <div className='container-fluid'>
                <h5 className='text-light px-3 mb-2 text-center '>Discover the best food</h5>
                {Object.keys(food).map((key, i) => (
                    <>
                        <h6 className='sub-item px-3'>{key==='veg' ? 'Veg Item' : key === 'non_veg' ? 'Non-Veg Item' : 'Cakes'}</h6>
                        <div className='row col-12 '>
                            {
                                food[key].map((item, index) => <div key={index} className='col-lg-2 col-md-4 col-12 mx-3 mb-3'>
                                    <div className='card'>
                                        <img alt='food' className='card-img-top p-2' src={item?.img} />
                                        <div className='card-body'>
                                            {/* <div className='food-pic' style={{ backgroundImage: `url(${item.img})` }} > */}
                                            {/* </div> */}
                                            <h6 className='text-danger mt-2'>{item.name}</h6>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='fw-bold text-nowrap'>Rs. {item.price}</span>
                                                {
                                                    click?.[item.id] ? <div className='text-end'>
                                                        <button className='btn cart-add bg-danger me-2' style={{ boxShadow: 'none' }} onClick={() => { setClick({ [item.id]: false }) }}><i className='fas fa-close text-light'></i></button>
                                                        <input className='w-25 mx-2' value={Object.keys(qty).find(data => String(data) === String(item.id)) ? qty?.[item.id] : 1} onChange={(e) => changeQty(e.target.value, item.id)} />
                                                        <button className='btn cart-add' style={{ boxShadow: 'none' }} onClick={() => addToCart(item)}><i className='fas fa-check text-light'></i></button>
                                                    </div> :
                                                        <button className='btn cart-add' style={{ boxShadow: 'none' }} onClick={() => { setClick({ [item.id]: true }) }}><i className='fas fa-cart-plus text-light'></i></button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>
                    </>
                ))
                }
            </div>
        </div>
    )
}

export default Home