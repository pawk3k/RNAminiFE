// // eslint-disable-next-line import/prefer-default-export
import { Column } from 'react-table';

export type { Column };

export interface TableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  totalCount?: number;
}
