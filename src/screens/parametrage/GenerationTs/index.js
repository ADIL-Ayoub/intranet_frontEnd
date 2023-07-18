import React, { useState, useEffect } from "react";
import "./index.css";
import { Fonts, useColors, FontSize, useToast } from "@common";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { Divider } from "@mui/material";
import { Button, Select, CheckBox } from "@components";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";
import { CLEINTS, SERVICES, DEPARTEMENT, PERSONNES } from "@services";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";

const TypesTs = [
  { id: 1, name: "Pointeuse" },
  { id: 2, name: "Horaire" },
  { id: 3, name: "Manuel" },
];

const TypesOfDays = [
  { id: 1, name: "Par Journée complète" },
  { id: 2, name: "Par demi journée" },
];

export default ({}) => {
  const toast = useToast();
  const Colors = useColors();
  const [isLoading, setIsLoading] = useState(false);
  const [serviceData, setServicesData] = useState([]);
  const [serviceValue, setServicesValue] = useState(null);
  const [client_id, setClientId] = useState(null);
  const [departement, setDepartements] = useState([]);
  const [clients, setClients] = useState([]);
  const [depValue, setDepValue] = useState(null);
  const [cliValue, setCliValue] = useState(null);
  const [typeTs, setTypeTs] = useState(null);
  const [isAuto, setIsAuto] = useState(false);
  const [isWithProject, setIsWithProject] = useState(false);
  const [typesTsData, setTypesTsData] = useState(TypesTs);
  const [signleDep, setSingleDep] = useState("");
  const [personnesData, setPersonnes] = useState([]);
  const [perValue, setPerValue] = useState([]);
  const [dayTypes, setDayTypes] = useState("");

  useEffect(() => {
    fetchDepartements();
  }, []);

  const handleAddGenerationTS = () => {
    console.log(depValue,
      cliValue,
      serviceValue,
      perValue)
    if (!depValue && !cliValue && perValue.length === 0 && !serviceValue) {
      toast("error", "Veuillez sélectionner au moins un paramétrage");
      return;
    }
    if (!typesTsData || !dayTypes) {
      toast("error", "Vous devez remplir les champs");
      return;
    }
    const params = {
      fGenerationTs: isAuto,
      sTypeGenerationTs: typeTs,
      fProjetTs: isWithProject,
      type: dayTypes === "Par Journée complète" ? "jour" : "demi",
    };
    setIsLoading(true);
    if (!cliValue && perValue.length === 0 && !serviceValue && depValue) {
      DEPARTEMENT.saveGestionTimeS(params, depValue)
        .then((data) => {

          setIsLoading(false);
          if (data.status === 201 || data.status === 200) {
            toast("success", "Gestion sauvegardée avec succès");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (error) {
            if (error.response) {
              toast(
                "error",
                error.response
                  ? error.response.data.message
                  : "Des choses ont mal tourné"
              );
            } else {
              toast("error", "Des choses ont mal tourné");
            }
          }
        });
    } else if (depValue && cliValue && perValue.length === 0 && !serviceValue) {
      console.log(2222);
      CLEINTS.saveGestionTimeS(params, cliValue)
        .then((data) => {
          setIsLoading(false);
          if (data.status === 201 || data.status === 200) {
            toast("success", "Gestion sauvegardée avec succès");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (error) {
            if (error.response) {
              toast(
                "error",
                error.response
                  ? error.response.data.message
                  : "Des choses ont mal tourné"
              );
            } else {
              toast("error", "Des choses ont mal tourné");
            }
          }
        });
    } else if (depValue && cliValue && serviceValue 
      //&& perValue.length === 0
      ) {
      SERVICES.saveGestionTimeS(params, serviceValue)
        .then((data) => {
          setIsLoading(false);
          if (data.status === 201 || data.status === 200) {
            toast("success", "Gestion sauvegardée avec succès");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (error) {
            if (error.response) {
              toast(
                "error",
                error.response
                  ? error.response.data.message
                  : "Des choses ont mal tourné"
              );
            } else {
              toast("error", "Des choses ont mal tourné");
            }
          }
        });
    }
  };
  const handleOnChangeDepartement = (e) => {
    setDepValue(e.target.value);
    fetchClient(e.target.value);
  };

  const handleOnChangeClients = (e) => {
    setCliValue(e.target.value);
    setClientId(e.target.value);
    fetchServicesData(e.target.value);
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

  const handleSelectTypeTs = (e) => {
    setTypeTs(e.target.value);
  };

  const fetchDepartements = () => {
    setIsLoading(true);
    DEPARTEMENT.fetchDepartement()
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          setDepartements(data.data.content);
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
    CLEINTS.fetchClients("", id)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          setClients(data.data.content);
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
          setServicesData(data.data.content);
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

  const handleOnChangeServices = (e) => {
    const {
      target: { value },
    } = e;
    setServicesValue(value);
    fitchPersonneByServices([value]);
  };

  const fitchPersonneByServices = (services) => {
    setIsLoading(true);
    const params = {
      services: services,
    };
    // PERSONNES.filterPersonnes(params, true)
    PERSONNES.filterPersonnes2(params, true)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          setPersonnes(data.data);
         
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

  const handleOnChangePersonnes = (e) => {
    const {
      target: { value },
    } = e;
    setPerValue(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleOnChangeTypeOfDays = (e) => {
    setDayTypes(e.target.value);
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
          Paramètres du{" "}
          <span style={{ borderBottom: "3px solid #ec9f36" }}>
            génération du TS
          </span>
        </h4>
      </div>
      <div style={{ width: "100%" }}>
        <Divider />
        <br />
      </div>
      <div className="paramertrage__conge_item">
        <div className="signle__items__settings">
          <div className="filter_generation_ts">
            <div className="title_filter_generation_ts">
              <TuneIcon
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
                Paramétrage par{" "}
                <em
                  style={{
                    background: Colors.primary,
                    color: "#FFFFFF",
                    padding: 4,
                  }}
                >
                  Département
                </em>{" "}
                |{" "}
                <em
                  style={{
                    background: Colors.primary,
                    color: "#FFFFFF",
                    padding: 4,
                  }}
                >
                  Client
                </em>{" "}
                |{" "}
                <em
                  style={{
                    background: Colors.primary,
                    color: "#FFFFFF",
                    padding: 4,
                  }}
                >
                  Service
                </em>{" "}
                |{" "}
                <em
                  style={{
                    background: Colors.primary,
                    color: "#FFFFFF",
                    padding: 4,
                  }}
                >
                  employés
                </em>
              </h4>
            </div>
            <div className="generation_ts_feilds">
              <Select
                label={"Département"}
                data={departement}
                style={{
                  width: "30ch",
                  marginTop: 1,
                }}
                value={depValue}
                isDepartement
                useId
                handleOnChange={handleOnChangeDepartement}
              />
              <Select
                label={"Clients"}
                data={clients}
                style={{
                  width: "30ch",
                  marginTop: 1,
                  marginLeft: 1,
                }}
                value={cliValue}
                isClient
                useId
                handleOnChange={handleOnChangeClients}
              />
              <Select
                label={"Services"}
                data={serviceData}
                style={{
                  width: "30ch",
                  marginTop: 1,
                  marginLeft: 1,
                }}
                value={serviceValue}
                useId
                isServices
                handleOnChange={handleOnChangeServices}
              />
              <Select
                label={"employés "}
                data={personnesData}
                style={{
                  width: "30ch",
                  marginTop: 1,
                  marginLeft: 1,
                }}
                isMultible={true}
                value={perValue}
                useId
                ispersonne
                handleOnChange={handleOnChangePersonnes}
              />
            </div>
            <div className="generation_ts_section">
              <CheckBox
                label="Generation des Timesheets (Manuel | Automatique)"
                handleChecked={handleCheckIsAuto}
                checked={isAuto}
                style={{ width: "100%" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <CenterFocusStrongIcon style={{ color: Colors.primary }} />
                <Select
                  label={"Type de Generation Timesheet"}
                  data={typesTsData}
                  style={{
                    width: "30ch",
                    marginTop: 1,
                    marginLeft: 1,
                  }}
                  value={typeTs}
                  handleOnChange={handleSelectTypeTs}
                />
                <CheckBox
                  label="Avec Projet Timesheet "
                  handleChecked={handleCheckIsWithProject}
                  checked={isWithProject}
                  style={{ marginLeft: 40 }}
                />
                <Select
                  label={"Type de journée"}
                  data={TypesOfDays}
                  style={{
                    width: "30ch",
                    marginTop: 1,
                    marginLeft: 1,
                  }}
                  value={dayTypes}
                  handleOnChange={handleOnChangeTypeOfDays}
                />
              </div>
            </div>
          </div>
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
            handlePressed={handleAddGenerationTS}
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
