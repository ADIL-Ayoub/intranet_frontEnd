import "./index.css";
import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Grids,
  IconButton,
  Users,
  Modal,
  Personnes,
  Search,
} from "@components";
import { MdPersonAdd } from "react-icons/md";
import { useColors, Fonts, useToast } from "@common";
import addUser from "@images/AddUser.png";
import Divider from "@mui/material/Divider";
import { USERS, ROLES, PERSONNES } from "@services";
import NewUserForm from "./components/NewUserForm";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { FaPeopleArrows } from "react-icons/fa";
import Checkbox from "@mui/material/Checkbox";

export default ({}) => {
  const [checkedAssign, setCheckedAssign] = React.useState(false);
  const [singleUserData, setSingleUserData] = useState(null);
  const Colors = useColors();
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(40);
  const [open, setOpen] = React.useState(false);
  const displayOnce = useRef(true);
  const toast = useToast();
  const validPassword = new RegExp(
    "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{12,32}$"
  );
  const [email, setEmail] = useState("");
  const [emailUpdate, setEmailUpdate] = useState("");
  const [users, setUsers] = useState([]);
  const [Roles, setRoles] = useState([]);
  const [idUser, setIdUser] = useState(null);
  const [role, setRole] = useState([]);
  const [roleUpdate, setRoleUpdate] = useState([]);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState({ feild: "", error: "" });
  const [idPersonne, setIdPersonne] = useState(null);
  const [personnesData, setPersonnesData] = useState([]);
  const [cin, setCin] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [post, setPost] = useState("");
  const [affected, setAffected] = useState({ id: null });
  const [openAssignment, setOpenAssignment] = useState(false);

  useEffect(() => {
    if (displayOnce.current) {
      displayOnce.current = false;
      fetchUsers();
      fetchRoles();
      fetchPersonnes();
    }
  }, []);

  useEffect(() => {
    fetchPersonnes();
  }, [page, rowsPerPage, cin, nom, prenom, post]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  

  const fetchPersonnes = (querySearch) => {
    const query = !!querySearch ? querySearch : `size=${rowsPerPage}&page=${page}&cin=${cin}&nom=${nom}&prenom=${prenom}&poste=${post}`;
    setIsLoading(true);
    PERSONNES.filterData(query)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          setPersonnesData(data.data?.content);
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

  const handleClickOpen = (id_user, email, roles) => {
    setOpen(true);
    setIdUser(id_user);
    setEmailUpdate(email);
    roles.length > 0 &&
      roles.map((ele) => setRoleUpdate((prv) => [...prv, ele.name]));
  };

  const handleClose = () => {
    setOpen(false);
    setIdUser(null);
    setEmail("");
    setRole([]);
    setRoleUpdate([]);
  };

  const handleChangeUsername = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (!validPassword.test(e.target.value)) {
      console.log("not matched");
    } else {
      console.log("matched and passed");
    }
  };

  const handleChangePersonne = (e) => {
    setIdPersonne(e.targte.value);
  };

  const handleAddNewUser = () => {
    if (!email || !password || !role) {
      toast("error", "vous devez d'abord remplir les champs, s'il vous plaît");
      return;
    }
    const params = {
      username: email.split("@")[0],
      email: email,
      password: password,
      role: role,
      idPersonne: affected?.id,
    };
    setIsLoading(true);
    USERS.newUser(params)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          toast("success", "Utilisateur ajouté avec succès");
          setRole([]);
          setEmail("");
          setPassword("");
        }
        fetchUsers();
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

  const handleChangeUsernameUpdate = (e) => {
    setEmailUpdate(e.target.value);
  };

  const handleOnChangeRolesUpdate = (e) => {
    const {
      target: { value },
    } = e;
    setRoleUpdate(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleOnChangeRoles = (event) => {
    const {
      target: { value },
    } = event;
    setRole(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const fetchRoles = () => {
    setIsLoading(true);
    ROLES.fetchRoles()
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          setRoles(data.data);
          fetchUsers();
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

  const fetchUsers = () => {
    setIsLoading(true);
    USERS.fetchUsers()
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          setUsers(data.data.content);
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

  const UpdateUserEvent = () => {
    //updateUser
    const params = {
      username: emailUpdate.split("@")[0],
      email: emailUpdate,
      roles: roleUpdate,
    };
    setIsLoading(true);
    USERS.updateUser(idUser, params)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          toast("success", "Utilisateur changé avec succès");
          fetchUsers();
          setRoleUpdate([]);
          setEmailUpdate("");
          handleClose();
        }
      })
      .catch((error) => {
        handleClose();
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

  const hanleChecked = (id, e) => {
    if (!affected?.id) {
      setAffected({ id: id });
      const findInPersonnes = personnesData.findIndex((ele) => ele.id === id);
      if (personnesData[findInPersonnes].faffectation === true) {
        toast("error", "La personne déja affectée");
      } else {
        personnesData[findInPersonnes].faffectation = true;
        setCheckedAssign(true);
      }
    } else {
      const findInPersonnes = personnesData.findIndex(
        (ele) => ele.id === affected?.id
      );
      const findInPersonnes2 = personnesData.findIndex((ele) => ele.id === id);
      personnesData[findInPersonnes].faffectation = false;
      if (personnesData[findInPersonnes2].faffectation === true) {
        toast("error", "La personne déja affectée");
      } else {
        setAffected({ id: id });
        personnesData[findInPersonnes2].faffectation = true;
        setCheckedAssign(true);
      }
    }
  };
  
  const handleCin = (e) => {
    setCin(e.target.value);
    console.log(e.target.value);
  };

  const handleNom = (e) => {
    setNom(e.target.value);
  };

  const handlePrenom = (e) => {
    setPrenom(e.target.value);
  };

  const handlePost = (e) => {
    setPost(e.target.value);
  };

  const handleClickOpenAssignment = (id) => {
    setOpenAssignment(true);
    setIdUser(id);
    FetchSingleUser(id);
  };

  const FetchSingleUser = (id) => {
    setIsLoading(true);
    USERS.findOneUser(id)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          setSingleUserData(data.data);
          setCheckedAssign(data?.data?.affecte);
          setAffected({ id: data?.data.personnel?.id });
        }
      })
      .catch((error) => {
        handleCloseAssignment();
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

  const handleCloseAssignment = () => {
    setOpenAssignment(false);
    setIdUser(null);
  };

  const handleChangeAssignment = () => {
    const query = `size=${rowsPerPage}&page=${page}&cin=${cin}&nom=${nom}&prenom=${prenom}&poste=${post}`;
    setIsLoading(true);
    PERSONNES.assignUserToPersonnes(idUser, affected?.id, {
      affecte: checkedAssign,
    })
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          setAffected({ id: null });
          setIdUser(null);
          handleCloseAssignment();
          toast("success", "L'utilisateur est affecté");
          fetchPersonnes(query);
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

  const handleAssignChecked = (e) => {
    setCheckedAssign(e.target.checked);
  };

  return (
    <div className="users__container">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grids xs={4}>
            <div className="title_header">
              <MdPersonAdd
                style={{ fontSize: "16px" }}
                className="add_user_icon"
              />
              <h3 style={{ fontFamily: Fonts().primaryRegular }}>
                Nouveau utilisateur
              </h3>
            </div>
            <div className="add_user_image">
              <img src={addUser} alt="user" />
            </div>
            <Divider />
            <NewUserForm
              isLoading={isLoading}
              email={email}
              handleChangeUsername={handleChangeUsername}
              error={error}
              password={password}
              handlePassword={handlePassword}
              Roles={Roles}
              role={role}
              handleOnChangeRoles={handleOnChangeRoles}
              handleAddNewUser={handleAddNewUser}
              handleChangePersonne={handleChangePersonne}
              idPersonne={idPersonne}
            />
          </Grids>
          <Grids xs={8}>
            <Users
              users={users}
              handleClickOpen={handleClickOpen}
              Assignment={handleClickOpenAssignment}
            />
          </Grids>
        </Grid>
      </Box>
      <Modal
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        title={"Mise à jour"}
        positiveText={"Mise à jour"}
        negativeText="Annuler"
        handlePositiveEvent={UpdateUserEvent}
      >
        <div style={{ width: 500, height: "auto", padding: 16 }}>
          <NewUserForm
            isLoading={isLoading}
            email={emailUpdate}
            handleChangeUsername={handleChangeUsernameUpdate}
            error={error}

            Roles={Roles}
            role={roleUpdate}
            handleOnChangeRoles={handleOnChangeRolesUpdate}
            isUpdate
          />
        </div>
      </Modal>
      <Modal
        open={openAssignment}
        handleClickOpen={handleClickOpenAssignment}
        handleClose={handleCloseAssignment}
        title={"Affectation"}
        positiveText={"mise à jour"}
        negativeText="Annuler"
        handlePositiveEvent={handleChangeAssignment}
      >
        <div style={{ width: "auto", height: "auto", padding: 16 }}>
          {singleUserData?.affecte ? (
            <>
              <Divider />
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <Stack
                    direction="row"
                    spacing={2}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: "70px",
                      width: "170px",
                    }}
                  >
                    <Avatar sx={{ bgcolor: Colors.primary }}>
                      {!!singleUserData && singleUserData?.username.slice(0, 2)}
                    </Avatar>
                    <p
                      style={{
                        fontFamily: Fonts().primaryRegular,
                        fontSize: "12px",
                      }}
                    >
                      {(!!singleUserData && singleUserData?.username) ||
                        (!!singleUserData && singleUserData?.email)}
                    </p>
                  </Stack>
                  <br />
                  <Divider />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: Fonts().primaryRegular,
                      fontSize: "12px",
                    }}
                  >
                    {" "}
                    l'utilisateur{" "}
                    <em>{!!singleUserData && singleUserData?.username} </em>
                    assigné à l'utilisateur{" "}
                    <em>
                      {(!!singleUserData && singleUserData?.personnel?.snom) +
                        " " +
                        (!!singleUserData &&
                          singleUserData?.personnel?.sprenom)}{" "}
                    </em>
                    .
                  </p>
                  <FaPeopleArrows style={{ fontSize: 22 }} />
                </div>
                <div>
                  <Stack
                    direction="row"
                    spacing={2}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: "70px",
                      width: "170px",
                    }}
                  >
                    <Avatar sx={{ bgcolor: Colors.secondary }}>
                      {!!singleUserData &&
                        singleUserData?.personnel?.snom.slice(0, 2)}
                    </Avatar>
                    <p
                      style={{
                        fontFamily: Fonts().primaryRegular,
                        fontSize: "12px",
                      }}
                    >
                      {(!!singleUserData && singleUserData?.personnel?.snom) +
                        " " +
                        (!!singleUserData &&
                          singleUserData?.personnel?.sprenom)}{" "}
                      {" de poste "}{" "}
                      {!!singleUserData && singleUserData?.personnel?.sposte}
                    </p>
                  </Stack>
                  <br />
                  <Divider />
                </div>
              </div>
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: Fonts().primaryRegular,
                    fontSize: "14px",
                    color: Colors.error,
                  }}
                >
                  Eliminer l'affectation{" "}
                </p>
                <Checkbox
                  checked={checkedAssign}
                  onChange={handleAssignChecked}
                  inputProps={{ "aria-label": "controlled" }}
                  sx={{
                    color: Colors.primary,
                    "&.Mui-checked": {
                      color: Colors.primary || "default",
                    },
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="filter">
                <Search
                  width="20ch"
                  isFilter
                  IconName={CreditCardIcon}
                  label="CIN"
                  onChange={(e) => handleCin(e)}
                  value={cin}
                />
                <Search
                  width="20ch"
                  isFilter
                  IconName={PersonSearchIcon}
                  label="Nom"
                  onChange={(e) => handleNom(e)}
                  value={nom}
                />
                <Search
                  width="20ch"
                  isFilter
                  IconName={PersonAddIcon}
                  label="Prénom"
                  onChange={(e) => handlePrenom(e)}
                  value={prenom}
                />
                <Search
                  width="20ch"
                  isFilter
                  IconName={AssuredWorkloadIcon}
                  label="Poste"
                  onChange={(e) => handlePost(e)}
                  value={post}
                />
                {/* <IconButton
                    IconName={SearchIcon}
                    fontSize={18}
                    boxStyle={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    style={{
                      color: "white",
                      padding: "11px 13px 11px 11px",
                      borderRadius: "6px",
                      background: "#e38e16",
                      marginLeft: "7px",
                    }}
                    pressed={fiterData}
                  /> */}
              </div>
              <br />
              <Divider />
              <br />
              <Personnes
                isAssign
                personnes={personnesData}
                hanleChecked={hanleChecked}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleChangePage={handleChangePage}
                count={count}
                usePagination
              />
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};
