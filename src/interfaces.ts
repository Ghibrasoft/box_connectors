export interface IConnections {
  start: number;
  end: number;
  isActive?: boolean;
}

export interface IBoardProps {
  children: React.ReactNode;
  connections?: IConnections[];
  className?: string;
  withDot?: boolean;
  lineCurviness?: number;
  borderWeight?: 2 | 4 | 8;
}

export interface IConnectorProps {
  startBox: { id: string };
  endBox: { id: string };
  lineCurviness?: number;
  withDot?: boolean;
  isActive?: boolean;
  borderWeight?: 2 | 4 | 8;
}

export interface IConnectorStyles {
  top: number;
  left: number;
  width: number;
  height: number;
  onTheSameLine: boolean;
  isUnderEachOther: boolean;
  startLineStyle: React.CSSProperties;
  centerLineTopStyle: React.CSSProperties;
  centerLineBottomStyle: React.CSSProperties;
  endLineStyle: React.CSSProperties;
}
