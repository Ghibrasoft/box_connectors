import { useRef, useState } from 'react';
import Board from './components/Board'

function App() {
  const [curviness, setCurviness] = useState(50);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateCurviness = () => {
    if (inputRef.current) {
      setCurviness(parseInt(inputRef.current.value));
    }
  };

  return (
    <>
      <div className='controls'>
        <h1>CSS Connectors</h1>
        <label>{'Curvy-ness (10-200)'}</label>
        <input ref={inputRef} value={curviness} onChange={updateCurviness} />
      </div>

      <div className='wrapper'>
        <Board
          boxQuantity={7}
          curviness={curviness}
          connections={[
            { start: 0, end: 1 },
            { start: 0, end: 3 },
            { start: 0, end: 5 },
            // { start: 0, end: 6 }
          ]}
        />
      </div>
    </>
  )
}

export default App;
