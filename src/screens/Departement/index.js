import React, { useState, useEffect } from "react";
import "./index.css";
import { Grids, Departements } from "@components";
import { Box, Divider, Grid } from "@mui/material";
import { useColors, Fonts, useToast } from "@common";
import SegmentIcon from "@mui/icons-material/Segment";
import { DEPARTEMENT } from "@services";
import { useNavigate } from "react-router-dom";

export default ({}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const Colors = useColors();
  const [departements, setDepartements] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(40);

  useEffect(() => {
    fetchDepartements();
  }, [page, rowsPerPage]);

  const handleClickDetails = (id) => {
    navigate(`${id}/services`)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchDepartements = () => {
    setIsLoading(true);
    const query = `size=${rowsPerPage}&page=${page}`;
    DEPARTEMENT.fetchDepartement(query)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          setDepartements(data.data.content);
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

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grids xs={12}>
            <br />
            <Divider />
            <br />
            <div
              className="list-of-departements"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <SegmentIcon
                  style={{ fontSize: 18, transform: "rotate(-0.50turn)" }}
                />
                <h4
                  style={{
                    fontFamily: Fonts().primaryRegular,
                    color: Colors.Gray,
                    fontSize: "12px",
                    marginLeft: 4,
                  }}
                >
                  Liste des départements
                </h4>
              </div>
            </div>
            <Divider />
            <Departements
              departement={departements}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              handleChangePage={handleChangePage}
              count={count}
              usePagination
              handleClickDetails = {handleClickDetails}
            />
          </Grids>
        </Grid>
      </Box>
    </div>
  );
};
