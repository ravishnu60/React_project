import { useEffect, useState } from "react";
import './App.css';
import win from './Assets/win.gif';

function App() {
  const color = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];
  const colorCode = {
    red: '#B71C1C',     // Crimson / Soul Red Metallic (deep, athletic)
    blue: '#1E3A8A',    // Midnight / Deep Navy Metallic (executive, modern)
    green: '#1B4332',   // British Racing / Emerald Green (prestige, rugged)
    yellow: '#EAB308',  // Liquid Gold / Dakar Yellow (warm amber, avoids neon)
    orange: '#C2410C',  // Sunset Orange / Burnt Copper (earthy, dynamic)
    purple: '#4C1D95'   // Velvet / Ultra Violet (deep royal luxury)
  };

  // Paired UI tints (For badges, card backgrounds, and selection states)
  const colorTint = {
    red: '#FEE2E2',     // Soft rose
    blue: '#DBEAFE',    // Crisp ice blue
    green: '#DCFCE7',   // Pale sage
    yellow: '#FEF9C3',  // Pale champagne
    orange: '#FFEDD5',  // Warm apricot
    purple: '#F3E8FF'   // Soft lilac
  };
  const resultVal = { 'crt': 0, 'crtWrg': 0, 'wrg': 0 };

  const [userColor, setUserColor] = useState(() => Array(4).fill(null));
  const [activeSlot, setActiveSlot] = useState(null);
  const [genColor, setGenColor] = useState([]);
  const [result, setResult] = useState(resultVal);
  const [resultList, setResultList] = useState([]);
  const [clue, setclue] = useState({});

  const randomNum = (sortcolor) => {
    return Math.floor(Math.random() * sortcolor.length);
  };

  //Generate random color
  const generateColor = () => {
    let tmepColor = [...color];
    let dynamicColor = [];
    Array.from(Array(4)).forEach(element => {
      let ranNum = randomNum(tmepColor);
      dynamicColor.push(tmepColor[ranNum])
      tmepColor.splice(ranNum, 1)
    });
    let initialOrder = [...dynamicColor];
    for (let index = initialOrder.length - 1; index > 0; index--) {
      let ranNum = randomNum(Array(index + 1));
      [initialOrder[index], initialOrder[ranNum]] = [initialOrder[ranNum], initialOrder[index]];
    }
    if (initialOrder.every((item, index) => item === dynamicColor[index])) {
      [initialOrder[0], initialOrder[1]] = [initialOrder[1], initialOrder[0]];
    }
    setGenColor(dynamicColor);
    setUserColor(initialOrder);
    setActiveSlot(null);
  }

  //disabled color when game ends
  const disabledSelected = () => {
    return resultList[resultList.length - 1]?.result['crt'] === 4
  }

  const getClue = () => {
    let tempclueIndex = randomNum(genColor);
    setclue({ index: tempclueIndex + 1, color: genColor[tempclueIndex] })
  }

  const moveChoice = (sourceIndex, targetIndex) => {
    if (sourceIndex === targetIndex || disabledSelected()) return;
    setResult(resultVal);
    setUserColor(current => {
      const next = [...current];
      [next[sourceIndex], next[targetIndex]] = [next[targetIndex], next[sourceIndex]];
      return next;
    });
    setActiveSlot(null);
  }

  const handleDrop = (event, slotIndex) => {
    event.preventDefault();
    const sourceIndex = event.dataTransfer.getData('application/x-color-game-slot');
    if (sourceIndex !== '') moveChoice(Number(sourceIndex), slotIndex);
  }

  const handleSlotClick = (slotIndex) => {
    if (activeSlot === null) {
      setActiveSlot(slotIndex);
      return;
    }
    if (activeSlot === slotIndex) {
      setActiveSlot(null);
      return;
    }
    moveChoice(activeSlot, slotIndex);
  }

  //  calculate result
  const finalResult = () => {
    if (!userColor.every(Boolean)) return;
    let tempResult = { ...resultVal };

    //Result calculations
    genColor.forEach((item, index) => {
      if (userColor.some(itemC => itemC === item)) {
        userColor.indexOf(item) === index ? ++tempResult['crt'] : ++tempResult['crtWrg']
      } else {
        ++tempResult['wrg']
      }
    });
    let temp = [...resultList]
    temp.push({ color: userColor, result: tempResult });

    setResult(tempResult);
    setResultList(temp);
  }

  //Display result
  const displayResult = () => {
    let total = result['crt'] + result['crtWrg'] + result['wrg'];
    if (total === 4) {
      if (result['crt'] === 4) {
        return (
          <section className="success-panel" role="status" aria-live="polite">
            <div className="success-heading">
              <span className="success-icon" aria-hidden="true"><i className="fa-solid fa-trophy"></i></span>
              <div>
                <p className="success-eyebrow">CODE CRACKED</p>
                <h2>Perfect lineup!</h2>
                <p className="success-copy">You put every car in the hidden order.</p>
              </div>
            </div>
            <div className="success-order" aria-label="The correct car order">
              {genColor.map((item, index) => (
                <div className="success-car" key={item}>
                  <span className="success-position">{index + 1}</span>
                  <span className="car-illustration" style={{ '--car-color': colorCode[item] }} aria-hidden="true">
                    <span className="car-roof" />
                    <span className="car-body" />
                    <span className="car-wheel car-wheel-front" />
                    <span className="car-wheel car-wheel-back" />
                  </span>
                </div>
              ))}
            </div>
            <img src={win} alt="Celebration" className="victory" />
            <button
              type="button"
              className="restart"
              onClick={() => { generateColor(); setclue({}); setResultList([]); setResult(resultVal); }}>
              <i className="fa-solid fa-rotate-right" aria-hidden="true"></i>
              <span>Play again</span>
            </button>
          </section>
        )
      } else {
        return (
          <div className="alert alert-danger p-1 font">Your guess is wrong! Try again.</div>
        )
      }
    }
  }

  useEffect(() => {
    const attempt = document.getElementById('attempt');
    attempt?.scrollTo?.(0, attempt.scrollHeight);
  }, [resultList])

  useEffect(() => {
    generateColor();
    // eslint-disable-next-line 
  }, [])


  return (
    <div className="container-fluid my-2">
      <h1 className="game-title">Crack the color code</h1>
      <div className="mx-1 row full-page">
        <div className="game-board col-lg-6 col-sm-12">
          <p className="game-instruction">Drag the cars to swap places, then check your lineup.</p>
          {/* Clue   */}
          <div className="hint-row">
            <button
              type="button"
              className="hint-button"
              onClick={getClue}
              disabled={clue?.index !== undefined}
              aria-label="Reveal one car position"
              title="Reveal one car position">
              <i className="fa-solid fa-lightbulb" aria-hidden="true"></i>
              <span>{clue?.color ? 'Hint used' : 'Get a hint'}</span>
            </button>
            {clue?.color && (
              <p className="hint-message" role="status">
                Position <strong>{clue.index}</strong> is <strong style={{ color: colorCode[clue.color] }}>{clue.color}</strong>
              </p>
            )}
          </div>
          <div className="order-slots" aria-label="Color order">
            {Array.from({ length: 4 }, (_, index) => (
              <button
                key={index}
                type="button"
                className={`order-slot order-slot-filled ${activeSlot === index ? 'order-slot-active' : ''}`}
                style={{ '--car-tint': colorTint[userColor[index]], '--car-accent': colorCode[userColor[index]] }}
                aria-label={`Order position ${index + 1}, ${userColor[index] || 'empty'}`}
                aria-pressed={activeSlot === index}
                disabled={disabledSelected()}
                draggable={Boolean(userColor[index])}
                onClick={() => handleSlotClick(index)}
                onDragStart={event => {
                  event.dataTransfer.setData('application/x-color-game-slot', String(index));
                  event.dataTransfer.effectAllowed = 'move';
                }}
                onDragOver={event => event.preventDefault()}
                onDrop={event => handleDrop(event, index)}>
                <span className="slot-number">{index + 1}</span>
                <span className="car-illustration" style={{ '--car-color': colorCode[userColor[index]] }} aria-hidden="true">
                  <span className="car-roof" />
                  <span className="car-body" />
                  <span className="car-wheel car-wheel-front" />
                  <span className="car-wheel car-wheel-back" />
                </span>
                <span className="car-name">{userColor[index]}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="check-order"
            disabled={!userColor.every(Boolean) || disabledSelected()}
            onClick={finalResult}>
            <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
            <span>Check order</span>
          </button>
          {/* Display result when select continuous four color */}
          {displayResult()}
        </div>
        <div id="attempt" className="attempt-panel col-lg-6 col-sm-12" aria-label="Race history">
          <div className="attempt-header">
            <div className="attempt-heading">
              <span className="attempt-heading-icon" aria-hidden="true"><i className="fa-solid fa-flag-checkered"></i></span>
              <div>
                <h2>Race log</h2>
                <p>{resultList.length ? `${resultList.length} ${resultList.length === 1 ? 'run' : 'runs'} completed` : 'Your checked lineups appear here'}</p>
              </div>
            </div>
            <span className="attempt-total" aria-label={`${resultList.length} attempts`}>{String(resultList.length).padStart(2, '0')}</span>
          </div>
          {resultList.length === 0 ? (
            <div className="attempt-empty">
              <span className="attempt-empty-icon" aria-hidden="true"><i className="fa-solid fa-car-side"></i></span>
              <h3>No runs yet</h3>
              <p>Set your order and check it to start your race log.</p>
            </div>
          ) : (
            <div className="attempt-list">
              {resultList.map((item, index) => (
                <article key={index} className={`attempt-card ${item.result.crt === 4 ? 'attempt-card-perfect' : ''}`}>
                  <div className="attempt-card-header">
                    <h3>Run {index + 1}</h3>
                    <span className="attempt-score">{item.result.crt}<span>/4 exact</span></span>
                  </div>
                  <div className="attempt-order" aria-label={`Run ${index + 1} car order`}>
                    {item.color.map((carColor, carIndex) => (
                      <div className="attempt-car" key={`${carColor}-${carIndex}`} style={{ '--car-tint': colorTint[carColor] }}>
                        <span>{String(carIndex + 1).padStart(2, '0')}</span>
                        <i className="fa-solid fa-car-side" style={{ color: colorCode[carColor] }} aria-label={`${carColor} car`}></i>
                      </div>
                    ))}
                  </div>
                  <div className="attempt-stats">
                    <div><span>Exact spots</span><strong>{item.result.crt}</strong></div>
                    <div><span>Out of place</span><strong>{item.result.crtWrg}</strong></div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
