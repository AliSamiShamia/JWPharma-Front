import React from "react";
import dynamic from "next/dynamic";
import { TableCellBaseProps } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { BlankLayoutProps } from "@/components/constant/types";
const TableCell = dynamic(() => import("@mui/material/TableCell"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const Table = dynamic(() => import("@mui/material/Table"));
const TableBody = dynamic(() => import("@mui/material/TableBody"));
const TableRow = dynamic(() => import("@mui/material/TableRow"));

const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: "0 !important",
  paddingRight: "0 !important",
  paddingTop: `${theme.spacing(1)} !important`,
  paddingBottom: `${theme.spacing(1)} !important`,
  width: "25%",
}));

const TableCellWidget = (props: BlankLayoutProps) => {
  return (
    <MUITableCell>
      <Grid
        display={"flex"}
        sx={{
          flexDirection: { md: "column", xs: "row" },
        }}
        alignItems={"center"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        gap={0.6}
      >
        {props.children}
      </Grid>
    </MUITableCell>
  );
};

function index() {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCellWidget>
            <></>
          </TableCellWidget>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default index;
