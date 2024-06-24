import { useCallback, useEffect, useState } from "react";
import { getBoxPositions } from "../helpers/getBoxPositions";

interface IConnectorProps {
    startBox: { id: string };
    endBox: { id: string };
    lineCurviness: number;
    withDot?: boolean;
}
const Connector: React.FC<IConnectorProps> = ({ startBox, endBox, lineCurviness, withDot = true }) => {
    const [connectorStyle, setConnectorStyle] = useState({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        startLineStyle: {},
        centerLineTopStyle: {},
        centerLineBottomStyle: {},
        endLineStyle: {}
    });

    const drawConnector = useCallback(() => {
        const borderWidth = 4;
        const { id: startId } = startBox;
        const { id: endId } = endBox;

        const { boxTop, boxBottom, boxLeft, boxRight } = getBoxPositions(startId, endId);
        const leftIsHigher = boxLeft!.top < boxRight!.top;
        const rightIsHigher = boxRight!.top < boxLeft!.top;
        const isUnderLeft = boxLeft!.bottom < boxRight!.top && boxLeft!.left === boxRight!.left;

        const top = leftIsHigher
            ? boxLeft!.top + (boxLeft!.height / 2)
            : boxRight!.top + (boxRight!.height / 2);
        const left = boxLeft!.right;
        const width = isUnderLeft ? boxLeft!.right + boxLeft!.height / 4 : boxRight!.left - left;
        const height = leftIsHigher
            ? (boxRight!.bottom - (boxRight!.height / 2)) - top + borderWidth
            : (boxLeft!.bottom - (boxLeft!.height / 2)) - top + borderWidth;
        const maxBorderRadius = Math.min(lineCurviness, width);
        const currentBorderRadius = Math.min(maxBorderRadius, height - borderWidth);
        const shouldSmooth = currentBorderRadius < maxBorderRadius;
        const widthAndMargin = shouldSmooth ? currentBorderRadius : (currentBorderRadius / 2) + borderWidth;


        // props (vertical & horizontal)
        const getCenterStyle = (v: string, h: string) => {
            return {
                height: (height / 2),
                width: `${widthAndMargin + borderWidth}px`,
                [`margin${h}`]: `${widthAndMargin}px`,
                [`border${v}${h}Width`]: borderWidth,
                [`border${h}Width`]: borderWidth,
                [`border${v}Width`]: v === 'Top'
                    ? Math.min(borderWidth, currentBorderRadius)
                    : borderWidth,
                [`border${v}${h}Radius`]: `${currentBorderRadius}px${shouldSmooth ? ' ' + (currentBorderRadius / 2) + 'px' : ''}`
            };
        };

        setConnectorStyle({
            top,
            left,
            width,
            height,
            startLineStyle: { alignSelf: `flex-${leftIsHigher ? 'start' : rightIsHigher ? 'end' : 'start'}` },
            centerLineTopStyle: getCenterStyle('Top', leftIsHigher ? 'Right' : 'Left'),
            centerLineBottomStyle: getCenterStyle('Bottom', isUnderLeft ? 'Right' : leftIsHigher ? 'Left' : 'Right'),
            endLineStyle: { alignSelf: `flex-${leftIsHigher ? 'end' : rightIsHigher ? 'start' : 'end'}` }
        });
    }, [startBox, endBox, lineCurviness]);


    useEffect(() => {
        drawConnector();
    }, [drawConnector]);

    const {
        top, left, width, height,
        startLineStyle,
        centerLineTopStyle,
        centerLineBottomStyle,
        endLineStyle
    } = connectorStyle;

    // console.log('Connector Re-Rendered');
    return (
        <div
            className='connector'
            style={{ top, left, width, height }}
        >
            <div className='line startLine' style={startLineStyle} data-attr-dot={withDot} />
            <div className='centerLine'>
                <div className='line centerLineTop' style={centerLineTopStyle} />
                <div className='line centerLineBottom' style={centerLineBottomStyle} />
            </div>
            <div className='line endLine' style={endLineStyle} data-attr-dot={withDot} />
        </div>
    );
};

export default Connector;