import { useState } from "react";
import Board from "./components/Board";

function App() {
  const boxes = [...Array(7).keys()];
  const [activeStates, setActiveStates] = useState(boxes.map(() => false));
  const CONNECTIONS = [
    { start: 0, end: 1, isActive: activeStates[0] },
    { start: 0, end: 3, isActive: activeStates[0] },
    { start: 2, end: 5, isActive: activeStates[2] },
    { start: 6, end: 5, isActive: activeStates[6] },
  ];
  const uniqueIds = Array.from(new Set(CONNECTIONS.map((conn) => conn.start)));

  const toggleIsActive = (index: number) => {
    setActiveStates(prevStates => prevStates.map((state, ind) => ind === index ? !state : state));
  }

  return (
    <div>
      <Board
        withDot={true}
        lineCurviness={50}
        connections={CONNECTIONS}
      >
        {boxes.map((_, index) => (
          <div
            key={index}
            className="box"
            id={`box${index}`}
          >
            {`box${index}`}
            {uniqueIds.includes(index) &&
              <button onClick={() => toggleIsActive(index)}>
                Toggle isActive
              </button>
            }
          </div>
        ))}
      </Board>
    </div>
  );
}

export default App;