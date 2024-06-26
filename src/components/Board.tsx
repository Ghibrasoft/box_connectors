import React, { memo } from "react";
import Connector from "./Connector";


interface IBoardProps {
    children: React.ReactNode;
    connections?: {
        start: number;
        end: number;
        isActive?: boolean
    }[]
    className?: string;
    withDot?: boolean;
    lineCurviness?: number;
    borderWeight?: 4 | 2 | 8 | 10 | 12;
}
const Board: React.FC<IBoardProps> = ({
    children,
    connections = [],
    className,
    withDot = true,
    lineCurviness,
    borderWeight,
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
                connections && connections.map(({ start, end, isActive = false }) =>
                    <Connector
                        key={`${start}-${end}`}
                        startBox={{ id: boxes[start] }}
                        endBox={{ id: boxes[end] }}
                        withDot={withDot}
                        lineCurviness={lineCurviness}
                        isActive={isActive}
                        borderWeight={borderWeight}
                    />
                )
            }
        </div>
    );
};

export default memo(Board);
