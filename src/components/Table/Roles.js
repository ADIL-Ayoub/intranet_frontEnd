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
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import LinkIcon from "@mui/icons-material/Link";

const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

const HeaderContent = ["Éditer", "#" , "Role", "privilages" , "actions"];

export default ({
  roles,
  update,
  handleClickOpen,
  handleOpenModalForUpdateRole,
}) => {
  const classes = useStyle();
  const Colors = useColors();
  return (
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
          {roles.map((row, index) => (
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
                  pressed={() =>
                    handleOpenModalForUpdateRole(row.id, row?.name)
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
                {row.name}
              </TableCell>
              <TableCell
                align="left"
                className={classes.TableCell}
                style={{
                  color: "gray",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  IconName={ViewStreamIcon}
                  fontSize={18}
                  style={{
                    color: Colors.primary,
                    width: 40,
                  }}
                  pressed={() => console.log(row.id)}
                />
              </TableCell>
              <TableCell
                align="left"
                className={classes.TableCell}
                style={{ color: "gray" }}
              >
                <IconButton
                  IconName={LinkIcon}
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
                  pressed={() => handleClickOpen(row?.id, row?.privileges)}
                />
              </TableCell>
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
