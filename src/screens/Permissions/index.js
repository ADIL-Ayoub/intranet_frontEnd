import "./index.css";
import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Grids, TextInput, Button, PrivilagesTable, Modal } from "@components";
import { useColors, Fonts, FontSize, useToast } from "@common";
import access from "@images/access.png";
import Divider from "@mui/material/Divider";
import { AiOutlineCheck } from "react-icons/ai";
import { TbLockAccess, TbMessageCode } from "react-icons/tb";
import { Privilages } from "@services";

export default ({}) => {
  const toast = useToast();
  const displayOnce = useRef(true);
  const Colors = useColors();
  const [privilage, setPrivilages] = useState("");
  const [privilages, setPrivilagesData] = useState([]);
  const [code, setCode] = useState("");
  const [codePrivilages, setCodePrivilages] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState({ feild: "", error: "" });
  const [open, setOpen] = React.useState(false);
  const [idPrivilage, setIdPrivilage] = useState("");

  useEffect(() => {
    if (displayOnce.current) {
      displayOnce.current = false;
      fetchPrivilages();
    }
  }, []);

  const handleChangeCode = (e) => {
    setCode(e.target.value);
  };

  const handlePrivilages = (e) => {
    setPrivilages(e.target.value);
  };

  const handleClickOpen = (id_p, name, code) => {
    setOpen(true);
    setIdPrivilage(id_p);
    setPrivilages(name);
    setCodePrivilages(code);
  };

  const updatePrivilages = () => {
    const params = {
      name: privilage,
      code: codePrivilages,
    };
    Privilages.updatePrivilages(idPrivilage, params)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          toast("success", "Le privilège a été mis à jour avec succès");
          handleClose();
          fetchPrivilages();
        }
      })
      .catch((error) => {
        if (error) {
          if (error?.response) {
            toast(
              "error",
              error?.response?.data?.message || "quelque chose s'est mal passé"
            );
            handleClose();
            setIsLoading(false);
          } else {
            toast("error", "quelque chose s'est mal passé");
            handleClose();
            setIsLoading(false);
          }
        } else {
          toast("error", "quelque chose s'est mal passé");
          handleClose();
          setIsLoading(false);
        }
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    console.log("hello ....");
  };

  const fetchPrivilages = () => {
    Privilages.fetchPrivileges()
      .then((data) => {
        if (data.status === 200) {
          setPrivilagesData(data.data.content);
        }
      })
      .catch((error) => console.log(error, "****"));
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
                Nouveaux privilèges
              </h3>
            </div>
            <div className="add_user_access">
              <img src={access} alt="user" />
            </div>
            <Divider />
            <div className="user__form">
              <TextInput
                isRequired
                disabled={isLoading}
                label="Nom du privilège"
                IconName={TbLockAccess}
                value={""}
                handleChangeValue={(e) => handlePrivilages(e)}
                style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
                error={error.feild === "name" && error.error}
                removeBase
                useGray
              />
              <TextInput
                isRequired
                disabled={isLoading}
                label="Code privilège"
                IconName={TbMessageCode}
                value={""}
                handleChangeValue={(e) => handleChangeCode(e)}
                style={{ width: "100%", marginTop: 16, borderRadius: 22 }}
                error={error.feild === "code" && error.error}
                removeBase
                useGray
              />
              <Button
                btnText={"Ajout"}
                IconName={AiOutlineCheck}
                handlePressed={handleLogin}
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
          <Grids xs={8} style={{ height: "100%" }}>
            <PrivilagesTable
              privilages={privilages}
              handleOpenModal={handleClickOpen}
            />
          </Grids>
        </Grid>
      </Box>
      <Modal
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        title="Modification !"
        positiveText="Mettre à jour"
        negativeText="Annuler"
        handlePositiveEvent = {updatePrivilages}
      >
        <div style={{ width: 500, height: "auto", padding: 16 }}>
          <TextInput
            isRequired
            disabled={isLoading}
            label="Nom du privilège"
            IconName={TbLockAccess}
            value={privilage ? privilage : ""}
            handleChangeValue={(e) => handlePrivilages(e)}
            style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
            error={error.feild === "name" && error.error}
            removeBase
            useGray
          />
        </div>
      </Modal>
    </div>
  );
};
