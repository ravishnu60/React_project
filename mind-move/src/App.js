import { useState } from 'react';
import './App.css';

function App() {
  const [rightCoin, setRightCoin]= useState([2,4,7]);
  const [leftCoin, setLeftCoin]= useState([3,6,8]);
  const [turn, setTurn]= useState(true); // if ture right, if false left
  const [move, setMove]= useState(null);

  const movePosible= {
    1:[2,5,3],
    2:[4,5,1],
    3:[1,5,6],
    4:[2,5,7],
    5:[1,2,3,4,5,6,7,8,9],
    6:[3,5,8],
    7:[4,5,9],
    8:[6,5,9],
    9:[7,5,8]
  }

  const coinIndex= (position)=>{
    let rightIndex= rightCoin.indexOf(position);
    let leftIndex= leftCoin.indexOf(position);
    if (rightIndex !== -1)
      return {position:position,coin:'right', index:rightIndex};
    else if (leftIndex !== -1)
      return {position:position,coin:'left', index:leftIndex};
    else
      return {position:position,coin:null, index:null};
  };

  const changeColor=(position)=>{
    return rightCoin.some(item => item === position) ? 'deeppink' : leftCoin.some(item => item === position) ? 'red' : '';
  };

  const checkCursor=(position)=>{
    if (turn){
      if (leftCoin.some(item => item === position)){
        return 'not-allowed';
      }else if (rightCoin.some(item => item === position)){
        return 'pointer';
      }
    }else{
      if (rightCoin.some(item => item === position)){
        return 'not-allowed';
      }else if (leftCoin.some(item => item === position)){
        return 'pointer';
      }
    }
  };

  const moveCoin =(position)=>{
    let positionIn= coinIndex(position);
    if (turn){
      if (positionIn.coin === 'right'){
        setMove(positionIn);
      }else if (positionIn.coin === null && move !== null){
        if (movePosible[move.position].includes(position)){
          let right= [...rightCoin];
          right[move.index]=position;
          setRightCoin(right);
          setTurn(!turn);
        }
      }
    }else{
      if (positionIn.coin === 'left'){
        setMove(positionIn);
      }else if (positionIn.coin === null && move !== null){
        if (movePosible[move.position].includes(position)){
          let right= [...leftCoin];
          right[move.index]=position;
          setLeftCoin(right);
          setTurn(!turn);
        }
      }    }
  };

  console.log(rightCoin, leftCoin);

  return (
    <>
      <div className='container pt-5 position-absolute' >
        <div className='d-flex justify-content-center'>
          <div className='line'></div>
          <div className='line l2'></div>
          <div className='line l3'></div>
          <div className='line l4'></div>
        </div>
      </div>

      <div className='container pt-5 position-absolute' >
        <div className='d-flex justify-content-center'>
          {/* node 1 */}
          <div className='circle-node' style={{backgroundColor: changeColor(1), cursor: checkCursor(1) }} onClick={()=>moveCoin(1)} >1</div> 
        </div>

        <div className='d-flex justify-content-between row2'>
          {/* node 2 */}
          <div className='circle-node' style={{backgroundColor: changeColor(2), cursor: checkCursor(2) }} onClick={()=>moveCoin(2)} >2</div>
          {/* node 3 */}
          <div className='circle-node' style={{backgroundColor: changeColor(3), cursor: checkCursor(3) }} onClick={()=>moveCoin(3)}>3</div>
        </div>
        <div className='d-flex justify-content-between row3'>
          {/* node 4 */}
          <div className='circle-node' style={{backgroundColor: changeColor(4), cursor: checkCursor(4) }} onClick={()=>moveCoin(4)}>4</div>
          {/* node 5 */}
          <div className='circle-node' style={{backgroundColor: changeColor(5), cursor: checkCursor(5) }} onClick={()=>moveCoin(5)}>5</div>
          {/* node 6 */}
          <div className='circle-node' style={{backgroundColor: changeColor(6), cursor: checkCursor(6) }} onClick={()=>moveCoin(6)}>6</div>
        </div>

        <div className='d-flex justify-content-between row4'>
          {/* node 7 */}
          <div className='circle-node' style={{backgroundColor: changeColor(7), cursor: checkCursor(7) }} onClick={()=>moveCoin(7)}>7</div>
          {/* node 8 */}
          <div className='circle-node' style={{backgroundColor: changeColor(8), cursor: checkCursor(8) }} onClick={()=>moveCoin(8)}>8</div>
        </div>

        <div className='d-flex justify-content-center'>
          {/* node 9 */}
          <div className='circle-node' style={{backgroundColor: changeColor(9), cursor: checkCursor(9) }} onClick={()=>moveCoin(9)}>9</div>
        </div>

      </div>
    </>
  );
}

export default App;
