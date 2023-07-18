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
import { IconButton, DateFormat } from "@components";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

const HeaderContent = ["Éditer", "#", "Privilage", "Date"];

export default ({ privilages, update, handleOpenModal }) => {
  const classes = useStyle();
  const Colors = useColors();
  return (
    <TableContainer
      component={Paper}
      style={{
        backgroundColor: Colors.tableBg,
        height: "100%",
        maxHeight: HEIGHT / 1.5,
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
          {privilages.map((row, index) => (
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
                  pressed={() => handleOpenModal(row.id, row?.name, row?.code)}
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
                {row.name}
              </TableCell>
              <TableCell
                align="center"
                className={classes.TableCell}
                style={{ color: "gray" }}
              >
                <DateFormat date={new Date(row.version)} />
              </TableCell>
              {/* <TableCell
                align="left"
                className={classes.TableCell}
                style={{ color: "gray" }}
              >
                <IconButton
                  IconName={DeleteOutlineIcon}
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
                  pressed={() => console.log("delete here")}
                />
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const useStyle = makeStyles({
  TableCell: {
    fontSize: 12,
    fontFamily: Fonts().primaryRegular,
  },
});
