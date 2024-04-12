import { useEffect, useState } from "react";
import './App.css';

function App() {

  const colorCode = { red: '#ff4a4ae8', blue: '#0183f3e8', green: '#2ca530e8', yellow: '#f5f900e8', orange: '#fb9906e8', black: '#000000e8', white:'#fff' }
  const resultVal = { 'crt': 0, 'crtWrg': 0, 'wrg': 0 };
  const [StaticColor, setStaticColor] = useState(['red', 'blue', 'green', 'yellow', 'orange', 'white']);

  const [userColor, setUserColor] = useState([]);
  const [genColor, setGenColor] = useState([]);
  const [result, setResult] = useState(resultVal);
  const [resultList, setResultList] = useState([]);

  const randomNum = (sortcolor) => {
    return Math.floor(Math.random() * sortcolor.length)
  };

  const generateColor = () => {
    let tmepColor = [...StaticColor];
    let dynamicColor = [];
    Array.from(Array(4)).forEach(element => {
      let ranNum = randomNum(tmepColor);
      dynamicColor.push(tmepColor[ranNum])
      tmepColor.splice(ranNum, 1)
    });
    setGenColor(dynamicColor);
  }

  const disabledSelected = (color) => {
    return userColor.some(item => item === color) || userColor.length === 4
  }

  const userChoice = (color) => {
    let tempusrColor = [...userColor];
    let tempResult = { ...userColor.length === 0 ? resultVal : result };

    tempusrColor.push(color);
    if (genColor.some(item => item === color)) {
      tempusrColor.indexOf(color) === genColor.indexOf(color) ? ++tempResult['crt'] : ++tempResult['crtWrg']
    } else {
      ++tempResult['wrg']
    }
    setUserColor(tempusrColor);
    setResult(tempResult);
  }

  const finalResult = () => {
    let temp = [...resultList]
    result['wrg'] === 0 &&  setStaticColor(userColor)
    temp.push({ color: userColor, result: result });
    setResultList(temp);
    setUserColor([]);
  }

  const displayResult = () => {
    let total = result['crt'] + result['crtWrg'] + result['wrg'];
    if (total === 4) {
      if (result['crt'] === 4) {
        return (
          <div className="alert alert-success p-1 font">Wow! You found all the colors.</div>
        )
      } else {
        return (
          <div className="alert alert-danger p-1 font">Your guess is wrong! Try again.</div>
        )
      }
    }
  }

  useEffect(() => {
    userColor.length === 4 && finalResult();
    document.getElementById('attempt').scrollTo(0, document.getElementById('attempt').scrollHeight);
    // eslint-disable-next-line 
  }, [userColor])

  useEffect(() => {
    generateColor();
    // eslint-disable-next-line 
  }, [])


  return (
    <div className="container-fluid my-2">
      <h5 className="small text-center">I gussed four color, Can you find those in same order ?</h5>
      <div className="mx-1 row full-page">
        <div className="col-lg-6 col-sm-12">
          <p className="mb-0 mt-3 text-color font">Select any below four Color</p>
          <div className="row mb-3">
            {StaticColor.map((item, index) =>
              <div key={index} className="col-lg-2 col-4 p-2">
                <button className="btn btn-sm" style={{ backgroundColor: colorCode[item], color: ['yellow', 'white'].includes(item) ? 'black' : 'white' }} disabled={disabledSelected(item)} onClick={() => userChoice(item)}>{item}</button>
              </div>
            )}
          </div>
          {displayResult()}
        </div>
        <div id="attempt" className={`col-lg-6 col-sm-12 ${displayResult() ? 'text-scroll':'scroll'}`}>
          {resultList.map((item, index) =>
            <div key={index}>
              <h5 className="font">Attempt : {index + 1}</h5>
              {item.color?.map((color, index) => <span key={index} style={{ backgroundColor: colorCode[color] }} className="selected-color"></span>)}
              {/* <p>{item?.color?.join(" ")}</p> */}
              {item?.result && <p className="mt-2 font">{`Right color in right place : ${item?.result['crt']}, Right color but wrong place : ${item?.result['crtWrg']}, Wrong color : ${item?.result['wrg']}`}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
