import "./index.css";
import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Grids, TextInput, Button, Roles, Modal, Select } from "@components";
import { useColors, Fonts, FontSize, useToast } from "@common";
import roleImage from "@images/roleImage.png";
import Divider from "@mui/material/Divider";
import { TbLockAccess } from "react-icons/tb";
import { MdOutlineSecurity } from "react-icons/md";
import { ROLES, Privilages } from "@services";
import CheckIcon from "@mui/icons-material/Check";

export default ({}) => {
  const Colors = useColors();
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState({ feild: "", error: "" });
  const [open, setOpen] = React.useState(false);
  const [idRole, setIdRole] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [privilages, setPrivilages] = useState([]);
  const [privilagesData, setPrivilagesData] = useState([]);

  const displayOnce = useRef(true);
  const toast = useToast();

  useEffect(() => {
    if (displayOnce.current) {
      displayOnce.current = false;
      fetchRoles();
    }
  }, []);

  const handleClickOpen = (id_r, Data) => {
    setOpen(true);
    setIdRole(id_r);
    fetchPrivilages();
    Data.length > 0 &&
      Data.map((ele) => setPrivilages((prv) => [...prv, ele.id]));
  };

  const handleOpenModalForUpdateRole = (id_role, name) => {
    setIsUpdate(true);
    setIdRole(id_role);
    setOpen(true);
    setRole(name);
  };

  const handleClose = () => {
    setPrivilages([]);
    setOpen(false);
    setRole("");
    setIsUpdate(false);
  };

  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };

  const handleAdd = () => {
    setIsLoading(true);
    const params = {
      name: role,
    };
    ROLES.addRole(params)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          toast("success", "Rôle ajouté");
          setRole("");
          fetchRoles();
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

  const fetchPrivilages = () => {
    Privilages.fetchPrivileges()
      .then((data) => {
        if (data.status === 200) {
          setPrivilagesData(data.data.content);
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

  const fetchRoles = () => {
    setIsLoading(true);
    ROLES.fetchRoles()
      .then((data) => {
        setIsLoading(false);
        if (data.status == 200 || data.status === 201) {
          setRoles(data.data);
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

  const AssignmentEvent = () => {
    setIsLoading(true);
    ROLES.Assignment(idRole, privilages)
      .then((data) => {
        setIsLoading(false);
        if (data.status == 200 || data.status === 201) {
          toast("success", "Les privilèges ont été attribués avec succès");
          handleClose();
          fetchRoles();
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

  const handleOnChangePrivilages = (event) => {
    const {
      target: { value },
    } = event;
    setPrivilages(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const UpdateRoleEvent = () => {
    setIsLoading(true);
    ROLES.Update(idRole, { name: role })
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          toast("success", "Le rôle est modifié");
          handleClose();
          fetchRoles();
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

  return (
    <div className="users__container">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grids xs={4}>
            <div className="title_header">
              <TbLockAccess
                style={{ fontSize: "16px" }}
                className="add_user_icon"
              />
              <h3 style={{ fontFamily: Fonts().primaryRegular }}>
                Nouveaux rôles
              </h3>
            </div>
            <div className="add_user_access">
              <img src={roleImage} alt="role" />
            </div>
            <Divider />
            <div className="user__form">
              <TextInput
                isRequired
                disabled={isLoading}
                label="Nom du rôle"
                IconName={MdOutlineSecurity}
                value={role}
                handleChangeValue={(e) => handleChangeRole(e)}
                style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
                error={error.feild === "name" && error.error}
                removeBase
                useGray
              />
              <Button
                btnText={"Ajout"}
                IconName={CheckIcon}
                handlePressed={handleAdd}
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
          </Grids>
          <Grids xs={8}>
            <Roles
              roles={roles}
              handleClickOpen={handleClickOpen}
              handleOpenModalForUpdateRole={handleOpenModalForUpdateRole}
            />
          </Grids>
        </Grid>
      </Box>
      <Modal
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        title={!isUpdate ? "Affectation !" : "Mise à jour"}
        positiveText={isUpdate ? "Mise à jour" : "Affecter"}
        negativeText="Annuler"
        handlePositiveEvent={isUpdate ? UpdateRoleEvent : AssignmentEvent}
      >
        <div style={{ width: 500, height: "auto", padding: 16 }}>
          {!isUpdate ? (
            <Select
              label={"Privilages"}
              data={privilagesData}
              style={{
                width: "100%",
                marginTop: 1,
              }}
              isMultible={true}
              value={privilages}
              useId
              handleOnChange={handleOnChangePrivilages}
            />
          ) : (
            <TextInput
              isRequired
              disabled={isLoading}
              label="Nom du rôle"
              IconName={MdOutlineSecurity}
              value={role}
              handleChangeValue={(e) => handleChangeRole(e)}
              style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
              error={error.feild === "name" && error.error}
              removeBase
              useGray
            />
          )}
        </div>
      </Modal>
    </div>
  );
};
