export enum StatsTypes {
  newCollection = 'newCollection',
  deleteCollection = 'deleteCollection',
  newItem = 'newItem',
  deleteItem = 'deleteItem',
  shareCollection = 'shareCollection',
}

export interface DataPoint {
  point: number;
  fill?: string;
}
