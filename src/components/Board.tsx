import React from "react";
import Connector from "./Connector";


interface IBoardProps {
    children: React.ReactNode;
    connections?: {
        start: number;
        end: number;
    }[]
    className?: string;
    withDot?: boolean
    lineCurviness?: number;
}
const Board: React.FC<IBoardProps> = ({
    children,
    connections = [],
    className,
    withDot = true,
    lineCurviness = 50
}) => {
    // function to extract IDs from children
    const extractIds = () => {
        let ids: string[] = [];

        React.Children.forEach(children, (child) => {
            // check if the child is a valid element with props and id
            if (React.isValidElement(child) && child.props.id) {
                ids.push(child.props.id);
            }
        });

        return ids;
    };
    const boxes = extractIds();

    return (
        <div className={`board ${className}`}>
            {children}
            {
                connections && connections.map(({ start, end }) =>
                    <Connector
                        key={`${start}-${end}`}
                        startBox={{ id: boxes[start] }}
                        endBox={{ id: boxes[end] }}
                        withDot={withDot}
                        lineCurviness={lineCurviness}
                    />
                )
            }
        </div>
    );
};

export default Board;
