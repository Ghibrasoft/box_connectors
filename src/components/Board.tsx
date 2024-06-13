import { useRef, useState } from "react";
import Connector from "./Connector";

const Board = () => {
    const [borderRadius, setBorderRadius] = useState(50);
    const inputRef = useRef<HTMLInputElement>(null);
    const [boxes] = useState([
        { id: 'box0', top: 100, left: 100 },
        { id: 'box1', top: 100, left: 1000 },
        { id: 'box2', top: 400, left: 100 },
        { id: 'box3', top: 400, left: 1000 },
        { id: 'box4', top: 700, left: 100 },
        { id: 'box5', top: 700, left: 1000 },
        { id: 'box6', top: 400, left: 550 }
    ]);
    const [connections] = useState([
        { start: 0, end: 6 },
        { start: 2, end: 6 },
        { start: 1, end: 6 },
        { start: 5, end: 6 }
    ]);

    const updateBorderRadius = () => {
        if (inputRef.current) {
            setBorderRadius(parseInt(inputRef.current.value));
        }
    };

    return (
        <div className="board">
            <h1>CSS Connectors</h1>
            <div className='controls'>
                <label>{'Curvy-ness (10-200)'}</label>
                <input ref={inputRef} value={borderRadius} onChange={updateBorderRadius} />
            </div>
            {
                boxes.map(({ id, top, left }) => (
                    <div
                        key={id}
                        id={id}
                        className='box'
                        style={{ top, left }}
                    >
                        {id}
                    </div>
                ))
            }
            {
                connections.map(({ start, end }) =>
                    <Connector
                        key={`${start}-${end}`}
                        startBox={boxes[start]}
                        endBox={boxes[end]}
                        borderRadius={borderRadius}
                    />
                )
            }
        </div>
    );
};

export default Board;