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
  borderWeight?: 4 | 2 | 8 | 10 | 12;
}

export interface IConnectorProps {
  startBox: { id: string };
  endBox: { id: string };
  lineCurviness?: number;
  withDot?: boolean;
  isActive?: boolean;
  borderWeight?: 4 | 2 | 8 | 10 | 12;
}
