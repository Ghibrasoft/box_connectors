import { useCallback, useEffect, useState } from "react";
import { getBoxPositions } from "../helpers/getBoxPositions";

const Connector = ({ startBox, endBox, borderRadius }: any) => {
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
        const top = boxTop!.top + (boxTop!.height / 2);
        const left = boxLeft!.right;
        const width = boxRight!.left - left;
        const height = (boxBottom!.bottom - (boxBottom!.height / 2)) - top + borderWidth;
        const maxBorderRadius = Math.min(borderRadius, width);
        const currentBorderRadius = Math.min(maxBorderRadius, height - borderWidth);
        const shouldSmooth = currentBorderRadius < maxBorderRadius;
        const widthAndMargin = shouldSmooth ? currentBorderRadius : (currentBorderRadius / 2);

        const getCenterStyle = (v: string, h: string) => {
            return {
                height: (height / 2) - borderWidth,
                width: `${widthAndMargin}px`,
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
            startLineStyle: { alignSelf: `flex-${leftIsHigher ? 'start' : 'end'}` },
            centerLineTopStyle: getCenterStyle('Top', leftIsHigher ? 'Right' : 'Left'),
            centerLineBottomStyle: getCenterStyle('Bottom', leftIsHigher ? 'Left' : 'Right'),
            endLineStyle: { alignSelf: `flex-${leftIsHigher ? 'end' : 'start'}` }
        });
    }, [startBox, endBox, borderRadius]);

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

    return (
        <div
            className='connector'
            style={{ top, left, width, height }}
        >
            <div className='line startLine' style={startLineStyle} />
            <div className='centerLine'>
                <div className='line centerLineTop' style={centerLineTopStyle} />
                <div className='line centerLineBottom' style={centerLineBottomStyle} />
            </div>
            <div className='line endLine' style={endLineStyle} />
        </div>
    );
};

export default Connector;