import { useState } from "react";
import Board from "./components/Board";

function App() {
  const boxes = [...Array(7).keys()];
  const [activeStates, setActiveStates] = useState(boxes.map(() => false));
  const CONNECTIONS = [
    { start: 0, end: 1, isActive: activeStates[0] },
    { start: 3, end: 1, isActive: activeStates[3] },
    { start: 5, end: 1, isActive: activeStates[5] },

    { start: 1, end: 2, isActive: activeStates[2] },
    { start: 1, end: 4, isActive: activeStates[4] },
    { start: 1, end: 6, isActive: activeStates[6] },
  ];
  // const uniqueIds = Array.from(new Set(CONNECTIONS.map((conn) => conn.start)));

  const toggleIsActive = (index: number) => {
    setActiveStates((prevStates) =>
      prevStates.map((state, ind) => (ind === index ? !state : state))
    );
  };

  return (
    <div style={{ height: '100vh' }}>
      <Board
        withDot={true}
        borderWeight={2}
        lineCurviness={16}
        connections={CONNECTIONS}
      >
        {boxes.map((_, index) => (
          <div
            key={index}
            className="box"
            id={`box${index}`}
            style={{
              gridRow: index === 1 ? 'span 3' : ''
            }}
          >
            {`box${index}`}
            {index !== 1 && (
              <button onClick={() => toggleIsActive(index)}>
                Toggle isActive
              </button>
            )}
          </div>
        ))}
      </Board>
    </div>
  );
}

export default App;