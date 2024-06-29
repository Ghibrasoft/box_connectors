import {
    memo,
    useCallback,
    useEffect,
    useState
} from "react";
import { IConnectorProps } from "../interfaces";
import { getBoxPositions } from "../helpers/getBoxPositions";


const Connector: React.FC<IConnectorProps> = ({
    startBox,
    endBox,
    lineCurviness = 50,
    withDot = true,
    isActive = false,
    borderWeight = 4
}) => {
    const [connectorStyle, setConnectorStyle] = useState({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        isSameLine: false,
        isUnderLeft: false,
        startLineStyle: {},
        centerLineTopStyle: {},
        centerLineBottomStyle: {},
        endLineStyle: {}
    });

    const drawConnector = useCallback(() => {
        const { id: startId } = startBox;
        const { id: endId } = endBox;

        const { boxLeft, boxRight } = getBoxPositions(startId, endId);
        const leftIsHigher = boxLeft!.top < boxRight!.top;
        const rightIsHigher = boxRight!.top < boxLeft!.top;
        const isSameLine = boxLeft!.top === boxRight!.top;
        const isUnderLeft = boxLeft!.bottom < boxRight!.top && boxLeft!.left === boxRight!.left;
        const isRightFirst = boxRight!.left < boxLeft!.left;
        if (isUnderLeft || startId === endId || isRightFirst) return;

        const top = leftIsHigher
            ? boxLeft!.top + (boxLeft!.height / 2)
            : boxRight!.top + (boxRight!.height / 2);
        const left = boxLeft!.right;
        const width = isUnderLeft ? boxLeft!.right + boxLeft!.height / 4 : boxRight!.left - left;
        const height = leftIsHigher
            ? (boxRight!.bottom - (boxRight!.height / 2)) - top + borderWeight
            : (boxLeft!.bottom - (boxLeft!.height / 2)) - top + borderWeight;
        const maxBorderRadius = Math.min(lineCurviness, width);
        const currentBorderRadius = Math.min(maxBorderRadius, height - borderWeight);
        const shouldSmooth = currentBorderRadius < maxBorderRadius;
        const widthAndMargin = shouldSmooth ? currentBorderRadius : (currentBorderRadius / 2) + borderWeight;

        // TODO: calculate end line left position based on isUnderLeft condition
        const endLineLeft = isUnderLeft ? -boxRight!.left : boxRight!.left; // dyn-val-1st-con

        // props (vertical & horizontal)
        const getCenterStyle = (v: string, h: string) => {
            return {
                height: (height / 2),
                width: `${widthAndMargin + borderWeight}px`,
                [`margin${h}`]: `${widthAndMargin}px`,
                [`border${v}${h}Width`]: borderWeight,
                [`border${h}Width`]: borderWeight,
                [`border${v}Width`]: v === 'Top'
                    ? Math.min(borderWeight, currentBorderRadius)
                    : borderWeight,
                [`border${v}${h}Radius`]: `${currentBorderRadius}px${shouldSmooth ? ' ' + (currentBorderRadius / 2) + 'px' : ''}`
            };
        };

        setConnectorStyle({
            top,
            left,
            width,
            height,
            isSameLine,
            isUnderLeft,
            startLineStyle: {
                alignSelf: `flex-${leftIsHigher ? 'start' : rightIsHigher ? 'end' : 'start'}`,
                zIndex: isActive ? 10 : ''
            },
            centerLineTopStyle: {
                ...getCenterStyle('Top', leftIsHigher ? 'Right' : 'Left'),
                zIndex: isActive ? 10 : ''
            },
            centerLineBottomStyle: {
                ...getCenterStyle('Bottom', isUnderLeft ? 'Right' : leftIsHigher ? 'Left' : 'Right'),
                zIndex: isActive ? 10 : ''
            },
            endLineStyle: {
                alignSelf: `flex-${leftIsHigher ? 'end' : rightIsHigher ? 'start' : 'end'}`,
                left: isUnderLeft ? `${endLineLeft}px` : '',
                zIndex: isActive ? 10 : ''
            }
        });
    }, [startBox, endBox, lineCurviness]);



    useEffect(() => {
        drawConnector();
    }, [drawConnector]);

    const {
        top, left, width, height,
        isSameLine,
        isUnderLeft,
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
            <div
                className='line startLine'
                style={startLineStyle}
                data-dot={withDot}
                data-is-active={isActive}
            />
            {isSameLine ? null :
                <div className='centerLine'>
                    <div
                        className='line centerLineTop'
                        style={centerLineTopStyle}
                        data-is-active={isActive}
                    />
                    <div
                        className='line centerLineBottom'
                        style={centerLineBottomStyle}
                        data-is-active={isActive}
                    />
                </div>
            }
            <div
                className='line endLine'
                style={endLineStyle}
                data-dot={withDot}
                data-is-active={isActive}
                data-dot-left={isUnderLeft}
            />
        </div>
    );
};

export default memo(Connector);