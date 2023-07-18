import React, { useState, useEffect } from "react";
import {
  Accordion,
  Grids,
  CheckBox,
  Select,
  Clients,
  Button,
} from "@components";
import { Box, Divider, Grid } from "@mui/material";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import { useColors, Fonts, useToast, FontSize } from "@common";
import SegmentIcon from "@mui/icons-material/Segment";
import { DEPARTEMENT, CLEINTS } from "@services";
import { useNavigate, useParams } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";

const TypesTs = [
  { id: 1, name: "Pointeuse" },
  { id: 2, name: "Houraire" },
  { id: 3, name: "Manuel" },
];
export default ({}) => {
  const navigate = useNavigate();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const Colors = useColors();
  const [typeTs, setTypeTs] = useState(null);
  const [isAuto, setIsAuto] = useState(false);
  const [isWithProject, setIsWithProject] = useState(false);
  const [clients, setClients] = useState([]);
  const [typesTsData, setTypesTsData] = useState(TypesTs);
  const [signleDep, setSingleDep] = useState("");
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(40);

  useEffect(() => {
    findOneDep();
    checkIsValid();
  }, []);

  useEffect(() => {
    fetchClient();
  }, [page, rowsPerPage]);

  const handleSelectTypeTs = (e) => {
    setTypeTs(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const findOneDep = () => {
    setIsLoading(true);
    DEPARTEMENT.findOne(params.id)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          setSingleDep(data.data);
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

  const fetchClient = () => {
    setIsLoading(true);
    const query = `size=${rowsPerPage}&page=${page}`;
    CLEINTS.fetchClients(query, params.id)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          setClients(data.data.content);
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

  const checkIsValid = () => {
    const copy = [...TypesTs];
    if (isAuto) {
      const filterData = copy.filter((ele) => ele.id !== 3);
      setTypeTs("");
      setTypesTsData(filterData);
    } else {
      const filterData = copy.filter((ele) => ele.id === 3);
      setTypeTs("");
      setTypesTsData(filterData);
    }
  };
  const handleSave = () => {
    setIsLoading(true);
    const paramsQuery = {
      fGenerationTs: isAuto,
      sTypeGenerationTs: typeTs,
      fProjetTs: isWithProject,
    };
    DEPARTEMENT.saveGestionTimeS(paramsQuery, params.id)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 201 || data.status === 200) {
          toast("success", "La gestion des timeSheet est bien enregistrée");
          setTypeTs("");
          setIsAuto(false);
          setIsWithProject(false);
          checkIsValid();
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

  const handleCheckIsAuto = (e) => {
    const copy = [...TypesTs];
    setIsAuto(e.target.checked);
    if (e.target.checked) {
      const filterData = copy.filter((ele) => ele.id !== 3);
      setTypeTs("");
      setTypesTsData(filterData);
    } else {
      const filterData = copy.filter((ele) => ele.id === 3);
      setTypeTs("");
      setTypesTsData(filterData);
    }
  };
  const handleCheckIsWithProject = (e) => {
    setIsWithProject(e.target.checked);
  };

  const handleClickDetails = (id) => {
    navigate(`${id}`);
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
            <Accordion
              title={`Gestion de département ${signleDep?.shortNameDepartement}`}
            >
              <div className="confg" style={{ width: "30%" }}>
                <CheckBox
                  label="Generation des Timesheets (Manuel | Automatique)"
                  handleChecked={handleCheckIsAuto}
                  checked={isAuto}
                />
                <br />
                <Divider />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <CenterFocusStrongIcon style={{ color: Colors.primary }} />
                  <Select
                    label={"Type de Generation Timesheet"}
                    data={typesTsData}
                    style={{
                      width: "100%",
                      marginTop: 2,
                      marginBottom: 2,
                      marginLeft: 2,
                    }}
                    value={typeTs}
                    handleOnChange={handleSelectTypeTs}
                  />
                </div>
                <Divider />
                <CheckBox
                  label="Avec Projet Timesheet "
                  handleChecked={handleCheckIsWithProject}
                  checked={isWithProject}
                />
                <Button
                  btnText={"Sauvegarder"}
                  IconName={SaveIcon}
                  handlePressed={handleSave}
                  isLoading={isLoading}
                  style={{
                    color: Colors.blackText,
                    backgroundColor: Colors.primary,
                    borderRadius: 12,
                    padding: "15px 26px",
                    fontFamily: Fonts().primaryRegular,
                    fontSize: FontSize().smallText,
                    marginTop: "22px",
                    width: "100%",
                  }}
                />
              </div>
            </Accordion>
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
                  Liste des clients
                </h4>
              </div>
            </div>
            <Divider />
            <Clients
              clients={clients}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              handleChangePage={handleChangePage}
              count={count}
              usePagination
              handleClickDetails={handleClickDetails}
            />
          </Grids>
        </Grid>
      </Box>
    </div>
  );
};
