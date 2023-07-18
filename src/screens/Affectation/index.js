import React, { useState, useEffect } from "react";
import "./index.css";
import { Fonts, useColors, FontSize, useToast } from "@common";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { Divider } from "@mui/material";
import { TextInput, Select, Button, Personnes, Search } from "@components";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { DEPARTEMENT, CLEINTS, SERVICES, PERSONNES } from "@services";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default ({}) => {
  const toast = useToast();
  const Colors = useColors();
  const [isLoading, setIsLoading] = useState(false);
  const [deparetement, setDepartement] = useState("");
  const [clients, setClients] = useState("");
  const [service, setService] = useState([]);
  const [deparetementData, setDepartementData] = useState([]);
  const [clientstData, setClientData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [personnesData, setPersonnesData] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(120);
  const [page2, setPage2] = useState(0);
  const [count2, setCount2] = useState(0);
  const [rowsPerPage2, setRowsPerPage2] = useState(20);
  const [cin, setCin] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [post, setPost] = useState("");
  const [affected, setAffected] = useState({ id: null });

  useEffect(() => {
    fetchDepartements();
  }, [page, rowsPerPage]);

  useEffect(() => {
    fetchPersonnes();
  }, [page2, rowsPerPage2, cin, nom, prenom, post]);

  const handleChangePage2 = (event, newPage) => {
    setPage2(newPage);
  };

  const handleChangeRowsPerPage2 = (event) => {
    setRowsPerPage2(parseInt(event.target.value, 10));
    setPage2(0);
  };

  const handleOnChangeDeparetement = (e) => {
    fetchClient(e.target.value);
    setDepartement(e.target.value);
  };

  const handleOnChangeClients = (e) => {
    fetchServicesData(e.target.value);
    setClients(e.target.value);
  };

  const handleOnChangeServices = (e) => {
    const {
      target: { value },
    } = e;
    setService(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleValidate = () => {
    if (!affected?.id) {
      toast("error", "Vous devez d'abord sélectionner une personne");
      return;
    }
    setIsLoading(true);
    PERSONNES.AssignPersonnesToService(affected?.id, service)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          toast("success", "l'opération s'est terminée avec succès.");
          setAffected({ id: null });
          setService([]);
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

  const fetchDepartements = () => {
    setIsLoading(true);
    const query = `size=120&page=0`;
    DEPARTEMENT.fetchDepartement(query)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          setDepartementData(data.data.content);
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

  const fetchClient = (id) => {
    setIsLoading(true);
    const query = `size=120&page=0`;
    CLEINTS.fetchClients(query, id)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          setClientData(data.data.content);
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

  const fetchServicesData = (IdClient) => {
    setIsLoading(true);
    SERVICES.fetchServices(IdClient)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          setServiceData(data.data.content);
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

  const hanleChecked = (id, e) => {
    setAffected({ id: id });
  };

  const handleCin = (e) => {
    setCin(e.target.value);
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

  const fetchPersonnes = (querySearch) => {
    const query = !!querySearch
      ? querySearch
      : `size=${rowsPerPage2}&page=${page2}&cin=${cin.trim()}&nom=${nom.trim()}&prenom=${prenom.trim()}&poste=${post.trim()}`;
    setIsLoading(true);
    PERSONNES.filterDataAll(query)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          setPersonnesData(data.data?.content);
          setCount2(data.data.totalElements);
          setPage2(data?.data?.pageable?.pageNumber);
          setRowsPerPage2(data?.data?.pageable?.pageSize);
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
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <div className="title__conge">
        <MiscellaneousServicesIcon style={{ color: "#716f6f" }} />
        <h4
          className="title_parametre"
          style={{
            fontFamily: Fonts().primaryRegular,
            color: "#716f6f",
            marginLeft: 8,
            fontSize: 16,
          }}
        >
          Gestion des{" "}
          <span style={{ borderBottom: "3px solid #ec9f36" }}>
            affectations
          </span>
        </h4>
      </div>
      <div style={{ width: "100%" }}>
        <Divider />
        <br />
      </div>
      <div className="paramertrage__conge_item">
        <div className="signle__items__settings">
          <div className="title__of__conge">
            <Select
              label={"Départements"}
              data={deparetementData}
              style={{
                width: "100%",
                marginTop: 1,
              }}
              value={deparetement}
              isDepartement
              useId
              handleOnChange={handleOnChangeDeparetement}
            />
            <Select
              label={"Clients"}
              data={clientstData}
              style={{
                width: "100%",
                marginTop: 1,
              }}
              value={clients}
              isClient
              useId
              handleOnChange={handleOnChangeClients}
            />
            <Select
              label={"Services"}
              data={serviceData}
              style={{
                width: "100%",
                marginTop: 1,
              }}
              value={service}
              isServices
              isMultible
              useId
              handleOnChange={handleOnChangeServices}
            />
          </div>
        </div>
        <div className="list_personnes">
          <div>
            <h5>
              {" "}
              {" << "} Liste des employés {" >> "}
            </h5>
          </div>
        </div>
        <div className="table">
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
            isAssign2
            idPersonne={affected?.id}
            personnes={personnesData}
            hanleChecked={hanleChecked}
            page={page2}
            rowsPerPage={rowsPerPage2}
            handleChangeRowsPerPage={handleChangeRowsPerPage2}
            handleChangePage={handleChangePage2}
            count={count2}
            usePagination
          />
        </div>
        <br />
        <Divider />
        <br />
        <div className="conge__actions">
          <Button
            disabled={isLoading}
            btnText={"Annuler"}
            IconName={CloseIcon}
            handlePressed={() => console.log("close .............")}
            isLoading={isLoading}
            style={{
              color: Colors.blackText,
              backgroundColor: Colors.error,
              borderRadius: 12,
              padding: "15px 26px",
              fontFamily: Fonts().primaryRegular,
              fontSize: FontSize().smallText,
              marginTop: "22px",
              width: "100%",
            }}
          />
          <Button
            disabled={isLoading}
            btnText={"Sauvegarder"}
            IconName={DoneIcon}
            handlePressed={handleValidate}
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
      </div>
    </div>
  );
};
