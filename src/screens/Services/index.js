import "./index.css";
import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { FaUsers } from "react-icons/fa";
import { Grids, Services, Search, Modal , Select} from "@components";
import { useColors, useToast, Fonts } from "@common";
import { SERVICES, PERSONNES } from "@services";
import { Divider } from "@mui/material";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";

export default ({}) => {
  const Colors = useColors();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("");
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(40);
  const [assignType, setAssignType] = useState([]);
  const [assigned, setAssigned] = useState([]);

  const displayOnce = useRef(true);
  const toast = useToast();

  useEffect(() => {
    fetchServices();
  }, [page, rowsPerPage]);

  const fetchServices = () => {
    setIsLoading(true);
    const query = `?size=${rowsPerPage}&page=${page}`;
    SERVICES.fetchAll(query)
      .then((data) => {
        setIsLoading(false);
        if (data.status == 200 || data.status === 201) {
          setServices(data.data?.content);
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

  const Assignment = (id, type) => {
    setOpen(true);
    setType(type);
    FetchPersonsByType(type);
  };

  const handleCloseAssignment = () => {
    setOpen(false);
  };

  const FetchPersonsByType = (type) => {
    const UpperType = type.toLocaleUpperCase();
    setIsLoading(true);
    PERSONNES.findPersonnesByPost(UpperType)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 201 || data.status === 200) {
          setAssignType(data.data.content);
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

  const handleOnChangeAssined = (e) => {
    const {
      target: { value },
    } = e;
    setAssigned(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeAssignment = () => {
    console.log(assigned, "µµµµµµµµµµµµµµ");
  };

  return (
    <div className="users__container">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grids xs={12}>
            <div className="title_header">
              <MiscellaneousServicesIcon
                style={{ fontSize: "16px" }}
                className="add_user_icon"
              />
              <h3 style={{ fontFamily: Fonts().primaryRegular }}>
                Liste des services
              </h3>
            </div>
            <div style={{ width: "100%", marginTop: 8, marginBottom: 8 }}>
              <Search width="40ch" />
            </div>
            <Divider />
            <Services
              services={services}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              handleChangePage={handleChangePage}
              count={count}
              usePagination
              Assignment={Assignment}
            />
          </Grids>
        </Grid>
      </Box>
      <Modal
        open={open}
        // handleClickOpen={handleClickOpenAssignment}
        handleClose={handleCloseAssignment}
        title={"Affectation " + type}
        positiveText={"mise à jour"}
        negativeText="Annuler"
        handlePositiveEvent={handleChangeAssignment}
      >
        <div style={{ width: "400px", height: "auto", padding: 16 }}>
          <Select
            label={type}
            data={assignType}
            style={{
              width: "100%",
              marginTop: 1,
            }}
            isMultible={true}
            value={assigned}
            useId
            handleOnChange={handleOnChangeAssined}
          />
        </div>
      </Modal>
    </div>
  );
};
