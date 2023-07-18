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
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LinkIcon from "@mui/icons-material/Link";
import Checkbox from "@mui/material/Checkbox";
import { Paginations } from "@components";
import { Divider } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const HeaderContent = [
  "Éditer",
  "#",
  "Code client",
  "Short name client",
  "Long name Client",
  "Logo Client",
  "Code semaine travail",
  "Details",
];

export default ({
  clients,
  usePagination,
  page,
  rowsPerPage,
  handleChangeRowsPerPage,
  handleChangePage,
  count,
  handleClickDetails,
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
                  {ele}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!!clients &&
              clients.map((row, index) => (
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
                      IconName={BorderColorIcon}
                      fontSize={18}
                      style={{
                        color: Colors.primary,
                      }}
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
                    {row.codeClient}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.TableCell}
                    style={{ color: "gray" }}
                  >
                    {row.shortNameClient}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.TableCell}
                    style={{ color: "gray" }}
                  >
                    {row.longNameClient}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.TableCell}
                    style={{ color: "gray" }}
                  >
                    LOGO is here
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.TableCell}
                    style={{ color: "gray" }}
                  >
                    {row.codeSemaineTravail}
                  </TableCell>
                  <TableCell
                    align="left"
                    className={classes.TableCell}
                    style={{ color: "gray" }}
                  >
                    <IconButton
                      pressed={() => handleClickDetails(row.id)}
                      IconName={KeyboardArrowRightIcon}
                      fontSize={18}
                      boxStyle={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      style={{
                        color: "gray",
                        padding: "9px 12px 8px 7px",
                        borderRadius: "12px",
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Divider />
      <br />
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
