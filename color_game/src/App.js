import { useEffect, useState } from "react";
import './App.css';
import win from './Assets/win.gif';

function App() {
  const color = ['red', 'blue', 'green', 'yellow', 'orange', 'white'];
  const colorCode = { red: '#ff4a4ae8', blue: '#0183f3e8', green: '#2ca530e8', yellow: '#f5f900e8', orange: '#fb9906e8', white: '#fff' }
  const selectedCode = { red: '#ff4a4a7d', blue: '#0183f387', green: '#2ca53087', yellow: '#f5f9007d', orange: '#fb99068f', white: '#ffffff9e' }
  const resultVal = { 'crt': 0, 'crtWrg': 0, 'wrg': 0 };
  const [StaticColor, setStaticColor] = useState(color);

  const [userColor, setUserColor] = useState([]);
  const [genColor, setGenColor] = useState([]);
  const [result, setResult] = useState(resultVal);
  const [resultList, setResultList] = useState([]);
  const [clue, setclue] = useState({});

  const randomNum = (sortcolor) => {
    return Math.floor(Math.random() * sortcolor.length);
  };

  //Generate random color
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

  //disabled color when game ends
  const disabledSelected = (color) => {
    return resultList[resultList.length - 1]?.result['crt'] === 4
  }

  const getuserColorIndex = (color) => {
    return userColor.indexOf(color);
  }

  const getClue = () => {
    let tempclueIndex = randomNum(genColor);
    setclue({ index: tempclueIndex + 1, color: genColor[tempclueIndex] })
  }

  //manage user click
  const userChoice = (color, userIndex) => {
    //make latest result empty
    setResult(resultVal);

    if (userIndex === -1) {
      let tempusrColor = [...userColor];
      tempusrColor.push(color);
      setUserColor(tempusrColor);
    } else {
      removeChoice(color)
    }
  }

  //remove user choice
  const removeChoice = (item) => {
    let tempusrColor = [...userColor];
    tempusrColor.splice(tempusrColor.indexOf(item), 1);
    setUserColor(tempusrColor);
  }

  //  calculate result
  const finalResult = () => {
    let tempResult = { ...resultVal };

    //Result calculations
    genColor.forEach((item, index) => {
      if (userColor.some(itemC => itemC === item)) {
        getuserColorIndex(item) === index ? ++tempResult['crt'] : ++tempResult['crtWrg']
      } else {
        ++tempResult['wrg']
      }
    });
    tempResult['wrg'] === 0 && setStaticColor(userColor);

    let temp = [...resultList]
    temp.push({ color: userColor, result: tempResult });

    setResult(tempResult);
    setResultList(temp);
    setUserColor([]);
  }

  //Display result
  const displayResult = () => {
    let total = result['crt'] + result['crtWrg'] + result['wrg'];
    if (total === 4) {
      if (result['crt'] === 4) {
        return (<>
          <div className="text-center">
            <img src={win} alt="Victory" className="victory mb-3" /><br />
            <div className="d-flex justify-content-center mb-2">
              <div className="alert alert-success p-1 me-2 mb-0 font">Wow! You found all the colors.</div>
              <button className="btn text-light restart btn-sm" onClick={() => { setclue({}); setResultList([]); setStaticColor(color); setResult(resultVal); }}>Play Again</button>
            </div>
          </div>
        </>
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
          <p className="mb-0 mt-3 text-color text-center font">Select any below four Color</p>
          {/* Clue   */}
          <div className="text-end">
            {clue?.color && <span className="mx-2" style={{ color: colorCode[clue?.color] }}>{clue?.index} color {clue?.color}</span>}
            <button className="btn btn-sm border border-warning rounded-circle" onClick={getClue} disabled={clue?.index !== undefined}>
              <i className="fa fa-lightbulb text-warning"></i><sub style={{fontSize:'x-small'}}>{clue?.color ? 0:1}</sub></button>
          </div>
          <div className="row mb-3 d-flex justify-content-center">
            {StaticColor.map((item, index) =>
              <div key={index} className="col-lg-2 col-4 p-2">
                <button
                  className="btn btn-sm form-control"
                  style={{backgroundColor: getuserColorIndex(item) === -1 ? colorCode[item] : selectedCode[item], color: ['yellow', 'white'].includes(item) ? 'black' : 'white' }}
                  disabled={disabledSelected()}
                  onClick={() => userChoice(item, getuserColorIndex(item))}>
                  {getuserColorIndex(item) !== -1 ? getuserColorIndex(item) + 1 : item}
                </button>
              </div>
            )}
          </div>
          {/* Display result when select continuous four color */}
          {displayResult()}
        </div>
        <div id="attempt" className={`col-lg-6 col-sm-12 pt-2 ${displayResult() ? 'text-scroll' : 'scroll'}`}>
          <div className="row">
            {resultList.map((item, index) =>
              <div key={index} className="col-lg-4 col-md-4 col-6 border-bottom border-info">
                <h5 className="font-attempt">Attempt : {index + 1}</h5>
                {item.color?.map((color, index) => <span key={index} style={{ backgroundColor: colorCode[color] }} className="selected-color"></span>)}
                {/* <p>{item?.color?.join(" ")}</p> */}
                {item?.result && <p className="mt-2 font">Correct color: <span className="sp1">{item?.result['crt']}</span><br />Wrong order: <span className="sp2">{item?.result['crtWrg']}</span><br />Wrong color: <span className="sp3">{item?.result['wrg']}</span></p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
