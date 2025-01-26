import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { forwardRef, ReactNode } from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Box,
  Skeleton,
} from "@mui/material";

interface ColumnsProps {
  width: number;
  label: string;
  dataKey: string;
  numeric?: boolean;
}

export const VirtualisedTable = ({
  columns,
  cellStyling,
  loading,
  items,
}: {
  columns: ColumnsProps[];
  cellStyling: (cellName: string, value: string, index: number) => ReactNode;
  loading: boolean;
  items: any[];
}) => {
  const VirtuosoTableComponents: TableComponents<any> = {
    Scroller: forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead: forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableHead {...props} ref={ref} />
    )),
    TableRow,
    TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  const fixedHeaderContent = () => (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? "right" : "left"}
          style={{ width: column.width }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );

  const rowContent = (index: number, row: any) => (
    <>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? "right" : "left"}
        >
          {cellStyling(column.dataKey, row[column.dataKey], index)}
        </TableCell>
      ))}
    </>
  );

  const loadingRowContent = () => (
    <>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? "right" : "left"}
        >
          <Box className="py-2">
            <Skeleton
              variant="rounded"
              sx={{ bgcolor: "var(--cp-grey-300)" }}
              width={"100%"}
              height={20}
            />
          </Box>
        </TableCell>
      ))}
    </>
  );

  return (
    <TableVirtuoso
      data={loading ? Array.from(Array(10).keys()) : items}
      components={VirtuosoTableComponents}
      fixedHeaderContent={fixedHeaderContent}
      itemContent={loading ? loadingRowContent : rowContent}
    />
  );
};
