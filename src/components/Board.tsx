import { useRef, useState } from "react";
import Connector from "./Connector";
import { generateBoxes } from "../helpers/generateBoxes";


interface IBoardProps {
    boxQuantity: number;
    width?: number;
    height?: number;
    borderRadius?: number;
    initialTop?: number;
    initialLeft?: number;
    gap?: number;
    cols?: number;
    connections?: {
        start: number;
        end: number;
    }[]
    withDot?: boolean
}
const Board: React.FC<IBoardProps> = ({
    boxQuantity,
    width = 200,
    height = 200,
    borderRadius = 0,
    initialTop = 100,
    initialLeft = 100,
    gap = 100,
    cols = 2,
    connections = [],
    withDot = true
}) => {
    const [curviness, setCurviness] = useState(50);
    const inputRef = useRef<HTMLInputElement>(null);
    // const connections = [
    //     { start: 0, end: 1 },
    //     { start: 2, end: 3 },
    //     { start: 4, end: 5 }
    // ];

    // dynamically calculate positions of the boxes
    const boxes = generateBoxes({ boxQuantity, width, height, cols, gap, initialTop, initialLeft });


    const updateCurviness = () => {
        if (inputRef.current) {
            setCurviness(parseInt(inputRef.current.value));
        }
    };

    // console.log("Board Re-rendered");
    return (
        <div className="board">
            <h1>CSS Connectors</h1>
            <div className='controls'>
                <label>{'Curvy-ness (10-200)'}</label>
                <input ref={inputRef} value={curviness} onChange={updateCurviness} />
            </div>
            {
                boxes.map(({ id, top, left }) => (
                    <div
                        key={id}
                        id={id}
                        className='box'
                        style={{ top, left, width, height, borderRadius: `${borderRadius}px` }}
                    >
                        {id}
                    </div>
                ))
            }
            {
                connections && connections.map(({ start, end }) =>
                    <Connector
                        key={`${start}-${end}`}
                        startBox={boxes[start]}
                        endBox={boxes[end]}
                        curviness={curviness}
                        withDot={withDot}
                    />
                )
            }
        </div>
    );
};

export default Board;
