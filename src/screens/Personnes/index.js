import "./index.css";
import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { FaUsers } from "react-icons/fa";
import { Grids, Personnes, Search } from "@components";
import { useColors, useToast, Fonts } from "@common";
import { PERSONNES } from "@services";
import { Divider } from "@mui/material";

export default ({}) => {
  const Colors = useColors();
  const [isLoading, setIsLoading] = useState(false);
  const [personnes, setPersonnes] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(40);
  const [cin, setCin] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [post, setPost] = useState("");

  const displayOnce = useRef(true);
  const toast = useToast();

  useEffect(() => {
    fetchPersonnes();
  }, [page, rowsPerPage, cin, nom, prenom, post]);

  const fetchPersonnes = () => {
    setIsLoading(true);
    const query = `size=${rowsPerPage}&page=${page}&cin=${cin}&nom=${nom}&prenom=${prenom}&poste=${post}`;
    PERSONNES.filterData(query)
      .then((data) => {
        setIsLoading(false);
        if (data.status == 200 || data.status === 201) {
          setPersonnes(data.data?.content);
          setCount(data.data.totalElements);
          setPage(data?.data?.pageable?.pageNumber);
          setRowsPerPage(data?.data?.pageable?.pageSize);
        }
      })
      .catch((error) => {
        if (error) {
          if (error?.response) {
            toast(
              "error",
              error?.response?.data?.message || "quelque chose s'est mal passé"
            );
            setIsLoading(false);
          } else {
            toast("error", "quelque chose s'est mal passé");
            setIsLoading(false);
          }
        } else {
          toast("error", "quelque chose s'est mal passé");
          setIsLoading(false);
        }
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="users__container">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grids xs={12}>
            <div className="title_header">
              <FaUsers style={{ fontSize: "16px" }} className="add_user_icon" />
              <h3 style={{ fontFamily: Fonts().primaryRegular }}>
                Liste des personnes
              </h3>
            </div>
            <div style={{ width: "100%", marginTop: 8, marginBottom: 8 }}>
              <Search width="40ch" />
            </div>
            <Divider />
            <Personnes
              personnes={personnes}
              handleClickOpen={() => console.log("error click event update")}
              handleOpenModalForUpdateRole={() =>
                console.log("hello clieck for update")
              }
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              handleChangePage={handleChangePage}
              count={count}
              usePagination
            />
          </Grids>
        </Grid>
      </Box>
    </div>
  );
};
