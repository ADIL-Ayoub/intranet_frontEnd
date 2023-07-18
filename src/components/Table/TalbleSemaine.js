import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useColors, Fonts } from "@common";
import { makeStyles } from "@mui/styles";
import { IconButton } from "@components";
import LinkIcon from "@mui/icons-material/Link";
import Checkbox from "@mui/material/Checkbox";
import { Paginations } from "@components";

const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const HeaderContent = ["Éditer", "#", "Nom Semaine"];

export default ({
  semaine,
  usePagination,
  page,
  rowsPerPage,
  handleChangeRowsPerPage,
  handleChangePage,
  count,
  isAssign,
  handleClickOpen
}) => {
  const classes = useStyle();
  const Colors = useColors();
  return (
    <div>
      <TableContainer
        component={Paper}
        style={{
          backgroundColor: Colors.tableBg,
          height: "100%",
          maxHeight: `calc(${HEIGHT}px - 170px)`,
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {HeaderContent.map((ele, index) => (
                <TableCell
                  align={index === 0 ? "left" : "center"}
                  key={index}
                  style={{
                    color: Colors.primary,
                    fontFamily: Fonts().primaryBold,
                    fontSize: 12,
                  }}
                >
                  {isAssign && index === 0 ? "Affecter" : ele}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!!semaine &&
              semaine.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.TableCell}
                    style={{ color: "gray" }}
                  >
                    <IconButton
                      IconName={LinkIcon}
                      fontSize={18}
                      style={{
                        color: Colors.primary,
                      }}
                      pressed={() =>
                        handleClickOpen(row.id)
                      }
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.TableCell}
                    style={{ color: "gray" }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.TableCell}
                    style={{ color: "gray" }}
                  >
                    {row.ssemaine}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {usePagination && (
        <Paginations
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChangePage={handleChangePage}
          count={count}
        />
      )}
    </div>
  );
};

const useStyle = makeStyles({
  TableCell: {
    fontSize: 12,
    fontFamily: Fonts().primaryRegular,
  },
});
