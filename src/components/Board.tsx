import { useRef, useState } from "react";
import Connector from "./Connector";

const Board = () => {
    const [borderRadius, setBorderRadius] = useState(50);
    const inputRef = useRef<HTMLInputElement>(null);
    const [boxes] = useState([
        { id: 'box1', top: 100, left: 100 },
        { id: 'box2', top: 100, left: 500 },
        { id: 'box3', top: 400, left: 100 },
        { id: 'box4', top: 600, left: 500 },
        { id: 'box5', top: 350, left: 500 },
        { id: 'box6', top: 100, left: 850 },
        { id: 'box7', top: 620, left: 950 }
    ]);
    const [connections] = useState([
        { start: 0, end: 1 },
        { start: 2, end: 3 },
        { start: 4, end: 1 },
        { start: 2, end: 4 },
        { start: 6, end: 3 }
    ]);

    const updateBorderRadius = () => {
        if (inputRef.current) {
            setBorderRadius(parseInt(inputRef.current.value));
        }
    };

    return (
        <div>
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