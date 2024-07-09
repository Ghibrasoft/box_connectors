import {
    memo,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";
import { IConnectorProps, IConnectorStyles } from "../interfaces";
import { checkErrors } from "../helpers/checkErrors";
import { getBoxPositions } from "../helpers/getBoxPositions";


const Connector: React.FC<IConnectorProps> = ({
    startBox,
    endBox,
    lineCurviness = 50,
    withDot = true,
    isActive = false,
    borderWeight = 4
}) => {
    const [connectorStyle, setConnectorStyle] = useState<IConnectorStyles>({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        onTheSameLine: false,
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
        const onTheSameLine = boxLeft!.top === boxRight!.top;

        // error handling
        const dublicatedConnections = startId === endId;
        const isRightFirst = boxRight!.left < boxLeft!.left;
        const isUnderLeft = boxLeft!.bottom < boxRight!.top && boxLeft!.left === boxRight!.left;
        if (checkErrors(dublicatedConnections, isRightFirst, isUnderLeft)) return;

        const top = leftIsHigher
            ? boxLeft!.top + (boxLeft!.height / 2)
            : boxRight!.top + (boxRight!.height / 2);
        const left = boxLeft!.right;
        const width = boxRight!.left - left;
        const height = leftIsHigher
            ? (boxRight!.bottom - (boxRight!.height / 2)) - top + borderWeight
            : (boxLeft!.bottom - (boxLeft!.height / 2)) - top + borderWeight;

        // border-radius
        const maxBorderRadius = Math.min(lineCurviness, width);
        const currentBorderRadius = Math.min(maxBorderRadius, height - borderWeight);
        const shouldSmooth = currentBorderRadius < maxBorderRadius;
        const widthAndMargin = shouldSmooth ? currentBorderRadius : (currentBorderRadius / 2) + borderWeight;

        // props (vertical & horizontal)
        const getCenterStyle = (v: string, h: string) => ({
            height: height / 2,
            width: `${widthAndMargin + borderWeight}px`,
            [`margin${h}`]: `${widthAndMargin}px`,
            [`border${v}${h}Width`]: borderWeight,
            [`border${h}Width`]: borderWeight,
            [`border${v}Width`]: v === "Top" ? Math.min(borderWeight, currentBorderRadius) : borderWeight,
            [`border${v}${h}Radius`]: `${currentBorderRadius}px${shouldSmooth ? ` ${currentBorderRadius / 2}px` : ""}`,
        });

        setConnectorStyle({
            top,
            left,
            width,
            height,
            onTheSameLine,
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
                ...getCenterStyle('Bottom', leftIsHigher ? 'Left' : 'Right'),
                zIndex: isActive ? 10 : ''
            },
            endLineStyle: {
                alignSelf: `flex-${leftIsHigher ? 'end' : rightIsHigher ? 'start' : 'end'}`,
                zIndex: isActive ? 10 : ''
            }
        });
    }, [startBox, endBox, lineCurviness]);



    useEffect(() => {
        drawConnector();
    }, [drawConnector]);

    const {
        top, left, width, height,
        onTheSameLine,
        startLineStyle,
        centerLineTopStyle,
        centerLineBottomStyle,
        endLineStyle
    } = connectorStyle;

    // memoized styles for performance
    const memoizedStartLineStyle = useMemo(() => startLineStyle, [startLineStyle]);
    const memoizedCenterLineTopStyle = useMemo(() => centerLineTopStyle, [centerLineTopStyle]);
    const memoizedCenterLineBottomStyle = useMemo(() => centerLineBottomStyle, [centerLineBottomStyle]);
    const memoizedEndLineStyle = useMemo(() => endLineStyle, [endLineStyle]);

    return (
        <div
            className='connector'
            style={{ top, left, width, height }}
        >
            <div
                className='line startLine'
                style={memoizedStartLineStyle}
                data-dot={withDot}
                data-is-active={isActive}
            />
            {!onTheSameLine &&
                <div className='centerLine'>
                    <div
                        className='line centerLineTop'
                        style={memoizedCenterLineTopStyle}
                        data-is-active={isActive}
                    />
                    <div
                        className='line centerLineBottom'
                        style={memoizedCenterLineBottomStyle}
                        data-is-active={isActive}
                    />
                </div>
            }
            <div
                className='line endLine'
                style={memoizedEndLineStyle}
                data-dot={withDot}
                data-is-active={isActive}
            />
        </div>
    );
};

export default memo(Connector);