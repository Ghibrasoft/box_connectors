import Board from './components/Board';

function App() {
  const boxes = [...Array(7).keys()];

  return (
    <div className='wrapper'>
      <Board
        lineCurviness={50}
        connections={[
          { start: 0, end: 1 },
          { start: 0, end: 3 },
          { start: 0, end: 5 },
          // { start: 0, end: 6 }
        ]}
      >
        {
          boxes.map((_, index) => (
            <div
              key={index}
              id={`box${index}`}
              className='box'
            >
              {`box${index}`}
            </div>
          ))
        }
      </Board>
    </div>
  )
}

export default App;
