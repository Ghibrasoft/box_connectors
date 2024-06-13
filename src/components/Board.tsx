import { useRef, useState } from "react";
import Connector from "./Connector";
import { generateBoxes } from "../helpers/generateBoxes";

interface IBoardProps {
    boxQuantity: number;
    initialTop?: number;
    initialLeft?: number;
    gap?: number;
    cols?: number;
}
const Board: React.FC<IBoardProps> = ({
    boxQuantity,
    initialTop = 100,
    initialLeft = 100,
    gap = 300,
    cols = 2,
}) => {
    const [borderRadius, setBorderRadius] = useState(50);
    const inputRef = useRef<HTMLInputElement>(null);
    const connections = [
        { start: 0, end: 1 },
        { start: 2, end: 3 },
        { start: 4, end: 5 }
    ];

    // dynamically calculate positions of the boxes
    const boxes = generateBoxes(boxQuantity, cols, gap, initialTop, initialLeft);


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
