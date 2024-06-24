import Board from "./components/Board";

function App() {
  const boxes = [...Array(7).keys()];

  return (
    <div>
      <Board
        connections={[
          // { start: 0, end: 1 },
          // { start: 0, end: 3 },
          // { start: 2, end: 5 },
          // { start: 6, end: 5 },

          { start: 0, end: 2 },
          { start: 0, end: 4 },
          { start: 0, end: 6 },
        ]}
        lineCurviness={50}
        withDot={true}
      >
        {boxes.map((_, index) => (
          <div key={index} id={`box${index}`} className="box">
            {`box${index}`}
          </div>
        ))}
      </Board>
    </div>
  );
}

export default App;